import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productRoute from "./routes/productRoutes.js"
import cors from "cors"
import bodyParser from "body-parser"
dotenv.config()
const app = express()

const PORT = 8000 || process.env.MONGO_URL 



const connect = async () =>{
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to MongoDB") 
} catch (error) {
    throw error
}
}

mongoose.connection.on("disconnect", ()=>{
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connect", ()=>{
    console.log("mongoDB connected")
})

// middlewares 
app.use(express.json())
app.use(cors())

app.use("/api/newproduct", productRoute)


app.listen(PORT, ()=>{
    connect()
    console.log(`server is running on port , ${PORT}`)

})