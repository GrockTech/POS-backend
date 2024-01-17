

// import ProductSchema from "../model/ProductSchema.js";
import Product from "../model/ProductSchema.js"
import PurchasedItems from "../model/PurchasedItems.js";

//Assuming data is an array of purchased items
// export const updateDatabase = async (data) => {
//   try {
//     for (const itemData of data) {
//       const itemId = itemData.item._id;
//       const purchasedQuantity = itemData.item.quantity;

//       // Retrieve current quantity from the database
//       const product = await ProductSchema.findById(itemId);
//       if (!product) {
//         console.log(`Product with ID ${itemId} not found.`);
//         continue;
//       }

//       // Subtract purchased quantity
//       const updatedQuantity = product.quantity - purchasedQuantity;

//       // Update the database with the new quantity
//       await ProductSchema.findByIdAndUpdate(itemId, { quantity: updatedQuantity });

//       console.log(`Updated quantity for product ${itemId}: ${updatedQuantity}`);
//     }

//     console.log('Database update completed successfully.');
//   } catch (error) {
//     console.error('Error updating database:', error.message);
//   }
// };

// export const updateDatabase = async (dataArray) => {
//   try {
//     for (const itemData of dataArray) {
//       const itemId = itemData._id; // Assuming _id is the identifier
//       const purchasedQuantity = itemData.quantity;

//       // Retrieve current quantity from the database
//       const product = await ProductSchema.findById(itemId);
//       if (!product) {
//         console.log(`Product with ID ${itemId} not found.`);
//         continue;
//       }

//       // Subtract purchased quantity
//       const updatedQuantity = product.quantity - purchasedQuantity;

//       // Update the database with the new quantity
//       await ProductSchema.findByIdAndUpdate(itemId, { quantity: updatedQuantity });

//       console.log(`Updated quantity for product ${itemId}: ${updatedQuantity}`);
//     }

//     console.log('Database update completed successfully.');
//   } catch (error) {
//     console.error('Error updating database:', error);
//   }
// };
export async function updateDatabase(productID, purchasedQuantity, purchasedPrice ){


  try {
    // Find the product by ID
    const product = await Product.findById(productID)

    console.log("this is product ID", productID)

    if (!product) {
      throw new Error('Product not found');
    }
    
if(product.quantity < 2 || product.quantity === 2){
  throw  new Error("there is no enough stock ")
} else {

  // update the quantity and price 
  product.quantity -= purchasedQuantity;
}
    // product.price -= purchasedPrice

    // save the upadted product 
    await product.save()
    
  } catch (error) {
    console.log(error)
    throw new Error('Error updating product quantity and  price ')
    
  }
}


