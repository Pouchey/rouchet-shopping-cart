import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  categorie: {
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
  minQuantity: {
    type: Number,
    required: true
  }
  
})

export default mongoose.model("Item", dataSchema)