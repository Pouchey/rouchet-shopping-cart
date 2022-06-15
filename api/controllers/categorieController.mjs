// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import Categorie from "../models/categorie.mjs";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import sharp from "sharp";

const deleteimg = (filename) => {
  fs.unlink(filename, err => {
    if (err) {
      console.log(err);
    }
  });
}
  


const getCategories = (req, res) => {
  Categorie.find({})
    .then(categories => {
      // Formatting the data
      const data = categories.map(categorie => {
        return {
          id: categorie.id,
          name: categorie.name,
          image: categorie.image.replace(/\\/g, "/")
        };
      });
      res.status(200).json(data);
    })
    .catch(err => {
      res.json(err);
    });
}
const addCategorie = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      message: "No file uploaded"
    });
    return;
  }
  
  const body = req.body;
  let filename = req.file.path;
  const { filename: image } = req.file;
  await sharp(req.file.path)
  .resize(200, 200)
  .jpeg({ quality: 90 })
  .toFile(`images/resized/${image}`);
  fs.unlinkSync(req.file.path)

  filename = `images/resized/${image}`;

  //check if categorie already exists in db
  Categorie.findOne({ id: body.id }, (err, data) => {
    if (err) {
      //delete image if categorie was not saved
      deleteimg(filename);
      res.status(500).json({
        message: "Error while trying to find categorie",
        error: err
      });
    } else if (data) {
      res.status(400).json({
        message: "Categorie already exists"
      });
    } else {
      //create new categorie
      const categorie = new Categorie({
        id: uuidv4(),
        name: body.name,
        image: filename
      });

      //save categorie in db
      categorie.save((err, data) => {
        if (err) {
          //delete image if categorie was not saved
          deleteimg(filename);
          res.status(500).json({
            message: "Error while trying to save categorie",
            error: err
          });
        } else {
          res.status(201).json({
            message: "Categorie saved",
            data: data
          });
        }
      });
    }
  });



}
const delCategorie = (req, res) => {
  const id = req.params.id;
  Categorie.findOne({ id: id }, (err, data) => {
    if (err) {

      res.status(500).json({
        message: "Error while trying to find categorie",
        error: err
      });
    } else if (!data) {

      res.status(400).json({
        message: "Categorie does not exist"
      });
    } else {
      //delete image
      deleteimg(data.image);
      //delete categorie
      Categorie.deleteOne({ id: id }, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error while trying to delete categorie",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Categorie deleted"
          });
        }
      });
    }
  });
}
const updateCategorie = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  let filename;

  // If no file is uploaded, we keep the old image
  if(req.file){
    filename = req.file.path;
    const { filename: image } = req.file;
    await sharp(req.file.path)
    .resize(200, 200)
    .jpeg({ quality: 90 })
    .toFile(`images/resized/${image}`);
    fs.unlinkSync(req.file.path)

    filename = `images/resized/${image}`;
  }

  Categorie.findOne({ id: id }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error while trying to find categorie",
        error: err
      });
    } else if (!data) {
      res.status(400).json({
        message: "Categorie does not exist"
      });
    } else {
      // delete image if it was changed
      if (filename !== data.image) {
        deleteimg(data.image);
      }
      else{
        filename = data.image;
      }

      //update categorie
      Categorie.updateOne({ id: id },{name:body.name,image:filename}, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error while trying to update categorie",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Categorie updated"
          });
        }
      });
    }
  });

  // // if image not already exists, we delete the image
  // Categorie.findOne({image:filename},(err,data)=>{
  //   if(err){
  //     res.status(500).json({
  //       message: "Error while trying to find categorie",
  //       error: err
  //     });
  //   }
  //   else if(!data){
  //     //delete image if categorie was not saved
  //     deleteimg(filename);
  //   }
  // })

}

export { getCategories, addCategorie, delCategorie, updateCategorie };