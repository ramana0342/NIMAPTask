const express = require("express")
const app = express()
const port = 8080

const cors = require("cors")
const mongoose = require("mongoose")


const categoryRoutes = require("./View/categoryRoutes")
const productRoutes = require("./View/productRoutes")
const paginationRoutes = require("./View/paginationProductsListRoute")

app.use(cors())
app.use(express.json());
app.use(categoryRoutes);
app.use(productRoutes);
app.use(paginationRoutes)




mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@productdatabase.noku0.mongodb.net/?retryWrites=true&w=majority&appName=ProductDataBase").then(()=>{
       console.log("DB Connected")
})



app.listen(port,()=>{
           console.log(`Server Running on Port ${port}`)
})