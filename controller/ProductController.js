import mongoose from "mongoose";
import Product from "../model/ProductSchema.js";
import PurchasedItems from "../model/PurchasedItems.js";
import { updateDatabase } from "./updateInventory.js";
// import { Inventory } from "./updateInventory.js";

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (req, res) => {
  const search = req.query.search || "";

  try {
    const Products = await Product.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json(Products);
  } catch (error) {
    throw error;
  }
};

// find single task
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted successfuly");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update an item 
export const updateProduct = async (req, res) => {
  const {id } = req.params;
  console.log(id, "update id here")
  try {
  const product = await Product.findByIdAndUpdate(id, req.body,  {
    new: true 
  })
  res.status(200).json(product)
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// };

export const purchasedItems = async (req, res) => {
  const { _id, title, quantity, price } = req.body;
  // console.log(req.body);

  try {
    const purchasedItems = new PurchasedItems({
      _id,
      title,
      quantity,
      price,
    });
    const savedPurchases = await purchasedItems.save();

    // const savedPurchases = await PurchasedItems.create(req.body);

    if (savedPurchases) {
      await updateDatabase(
        req.body.productID,
        req.body.quantity,
        req.body.price
      );

      res.status(200).json(savedPurchases);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getpurchasedItem = async (req, res) => {
  const { title, price, quantity } = req.body;
  // console.log(req.body)
  
  
  try {
    const Purchase = await PurchasedItems.findOne({ title });
    console.log(Purchase["_id"])
    // const Purchase = await PurchasedItems.findOne({ title });
  

    if (!Purchase) {
      return res.status(404).json({ error: "Item not found" });
    }
    // // taking total quantity and adding co to it


    if(quantity){
      const currentQuantity = Purchase.quantity 
      console.log(currentQuantity, " there is current quantity")
    }
    // if (quantity) {
    //    // Convert both existing quantity and new quantity to numbers before adding
    //     // Number(Purchase.quantity) += Number(quantity);
    //     // parseInt(Purchase.quantity) +=  parseInt(quantity) 
    //     Purchase.quantity += quantity 
    //    console.log("Quantity updated successfully");
    // } else {
    //   console.log("quantity not found");
    // }

    // if (price) {
    //   Purchase.price += Number(price);
    // }

   
    // console.log(Purchase, "final purchased");
    // await Purchase.save();
    // res.status(200).json(Purchase);
  } catch (error) {
    console.log("error saving to DB", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const AllpurchasedItems = async (req, res) => {
  try {
    const Purchase = await PurchasedItems.find();
    res.status(200).json(Purchase);
  } catch (error) {
    console.log(error);
  }
};
