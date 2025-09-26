require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/blog")
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");


//Middle wares

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use("/",routes)


//DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(()=>{
        console.log("Successfully Connected your Database")
    })
    .catch((err)=>{
        console.log("Failed to connect to the database",err)
    })
  

//Server
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is Successfully running on the port ${PORT}`)
})