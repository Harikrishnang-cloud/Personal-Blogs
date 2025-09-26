const mongoose = require("mongoose")

  const blogSchema = new mongoose.Schema({
      title:String,
      body:String,
      createdAt:{
          type:Date,
          default:Date.now,
      }
  })
  module.exports = mongoose.model("blog", blogSchema)