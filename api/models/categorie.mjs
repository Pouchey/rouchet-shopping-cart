import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
  
})

export default mongoose.model("Categorie", dataSchema)