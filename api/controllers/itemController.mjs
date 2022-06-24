// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import Item from "../models/item.mjs";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import sharp from "sharp";

const getItems = (req, res) => {

  const { id } = req.params;
  
  Item.find({ categorie: id })
    .then(items => {
      // Formatting the data
      const data = items.map(item => {
        return {
          id: item.id,
          name: item.name,
          image: item.image.replace(/\\/g, "/"),
          quantity: item.quantity,
          minQuantity: item.minQuantity
        };
      });
      res.status(200).json(data);
    })
    .catch(err => {
      res.json(err);
    });
}
const addItem = async (req, res) => {

  const catid = req.params.id;

  if (!req.file) {
    res.status(400).json({
      message: "No file uploaded"
    });
    return;
  }

  const body = req.body;
  //Check that the name is not already used
  Item.findOne({ name: body.name }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while checking the name"
      });
      return;
    }
    if (data) {
      res.status(400).json({
        message: "Name already used"
      });
      return;
    }
  });


  let filename = req.file.path;
  const { filename: image } = req.file;
  await sharp(req.file.path)
  .resize(200, 200)
  .toFile(`images/resized/${image}`);
  fs.unlinkSync(req.file.path)

  filename = `images/resized/${image}`;

  //check if item already exists in db
  Item.findOne({ id: body.id }, (err, data) => {
    if (err) {
      //delete image if item was not saved
      fs.unlink(filename, err => {if (err) {console.log(err);}});(filename);
      res.status(500).json({
        message: "Error while trying to find item",
        error: err
      });
    } else if (data) {
      res.status(400).json({
        message: "Item already exists"
      });
    } else {
      //create new item
      const item = new Item({
        id: uuidv4(),
        categorie: catid,
        name: body.name,
        image: filename,
        quantity: body.quantity,
        minQuantity: body.minQuantity
      });

      //save item in db
      item.save((err, data) => {
        if (err) {
          //delete image if item was not saved
          fs.unlink(filename, err => {if (err) {console.log(err);}});(filename);
          res.status(500).json({
            message: "Error while trying to save item",
            error: err
          });
        } else {
          res.status(201).json({
            message: "Item saved"
          });
        }
      });
    };
  });
}
const delItem = (req, res) => {

  const { id } = req.params;
  Item.findOne({ id: id }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while trying to find item",
        error: err
      });
    } else if (!data) {
      res.status(400).json({
        message: "Item does not exist"
      });
    }
    else {
      //delete image if item was not saved
      fs.unlink(data.image, err => {if (err) {console.log(err);}});(data.image);
      //delete item from db
      Item.deleteOne({ id: id }, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error while trying to delete item",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Item deleted"
          });
        }
      });
    }
  });
}
const updateItem = async (req, res) => {

  const { id } = req.params;
  const body = req.body;
  //Check that the name is not already used
  Item.findOne({ name: body.name }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while checking the name"
      });
      return;
    }
    if (data) {
      res.status(400).json({
        message: "Name already used"
      });
      return;
    }
  });
  let filename;

  if (req.file) {
    filename = req.file.path;
    const { filename: image } = req.file;
    await sharp(req.file.path)
    .resize(200, 200)
    .toFile(`images/resized/${image}`);
    fs.unlinkSync(req.file.path)
    filename = `images/resized/${image}`;
  }

  Item.findOne({ id: id }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while trying to find item",
        error: err
      });
    } else if (!data) {
      res.status(400).json({
        message: "Item does not exist"
      });
    } else {
      //update item in db
      Item.updateOne({ id: id }, { $set: { name: body.name, image: filename, quantity: body.quantity, minQuantity: body.minQuantity } }, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error while trying to update item",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Item updated"
          });
        }
      });
    }
  });

}
const incrementItem = (req, res) => {

  const { id } = req.params;
  Item.findOne({ id: id }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while trying to find item",
        error: err
      });
    } else if (!data) {
      res.status(400).json({
        message: "Item does not exist"
      });
    }
    else {
      //update item in db
      Item.updateOne({ id: id }, { $inc: { quantity: 1 } }, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error while trying to update item",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Item updated"
          });
        }
      });
    }
  });
}
const decrementItem = (req, res) => {
  
    const { id } = req.params;
    Item.findOne({ id: id }, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Error while trying to find item",
          error: err
        });
      } else if (!data) {
        res.status(400).json({
          message: "Item does not exist"
        });
      }
      else {
        //update item in db
        Item.updateOne({ id: id }, { $inc: { quantity: -1 } }, (err, data) => {
          if (err) {
            res.status(500).json({
              message: "Error while trying to update item",
              error: err
            });
          } else {
            res.status(200).json({
              message: "Item updated"
            });
          }
        });
      }
    });
}

export default {
  getItems,
  addItem,
  delItem,
  updateItem,
  incrementItem,
  decrementItem
}