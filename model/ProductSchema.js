import mongoose from "mongoose";

const produchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
   
  },
  desc: {
    type: String,
 
  },
  category: {
    type: String,
  
  },
  pImage: {
    type: String,
 
  },
});

export default mongoose.model("Product", produchSchema);
