// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import Item from "../models/item.mjs";


const getCart = (req, res) => {

  Item.find({})
    .then(items => { 
      // remove items where quantity > minQuantity
      let data = items.filter(item => item.quantity < item.minQuantity);
      // Formatting the data
      data = data.map(item => {
        return {
          id: item.id,
          name: item.name,
          image: item.image.replace(/\\/g, "/"),
          quantity: item.quantity,
          minQuantity: item.minQuantity,
        };
      });
      res.status(200).json(data);
    })
    .catch(err => {
      res.json(err);
    }
  );
}

export default {
  getCart
}