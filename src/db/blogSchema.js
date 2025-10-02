const mongoose = require("mongoose")

  const blogSchema = new mongoose.Schema({
      title:String,
      body:String,
      createdAt:{
          type:Date,
          default:Date.now,
      },
      author:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      }

  })
  module.exports = mongoose.model("blog", blogSchema)