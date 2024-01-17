import mongoose from "mongoose";

const itemsPurchased = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    // required: true,
  },
  title: String,
  price: Number,
  quantity: Number,
});

export default mongoose.model("Purchases", itemsPurchased);
