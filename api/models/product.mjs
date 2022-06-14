import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  _categorie: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  maxQuantity: {
    type: Number,
    required: true
  }
  
})

export default mongoose.model("product", dataSchema)