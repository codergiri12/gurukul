const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description:{type:String,required:true},
  postedBy:{type:Schema.ObjectId,ref:"User"},
  createdAt: { type: Date,default: Date.now,},
  classId:{type:Schema.Types.ObjectId,ref:"Class"},
  files:[{type:Object}],
});

module.exports = mongoose.model("Post", postSchema);  