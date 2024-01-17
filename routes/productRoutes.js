import express from "express";
import {
  AllpurchasedItems,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getpurchasedItem,
  purchasedItems,
  updateProduct,
} from "../controller/ProductController.js";

const Router = express();

Router.post("/", createProduct);
Router.get("/products", getProducts);
Router.get("/productone/:id", getProduct);
Router.delete("/product/:id", deleteProduct);
Router.put("/updateproduct/:id", updateProduct);

Router.post("/purchased", purchasedItems);
Router.put("/purchasedupdate", getpurchasedItem);
Router.get("/allpurchased", AllpurchasedItems);

export default Router;
