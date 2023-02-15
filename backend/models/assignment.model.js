const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  classId:{type:Schema.Types.ObjectId,ref:"Class"},
  dueDate: {type: Date},
  points:{type:Number,required:true},
  classComments:{type:Array},
  files:[{type:Object}],
  postedBy:{type:Schema.ObjectId,ref:"User"},
  submissions:[{type:Schema.Types.ObjectId, ref: 'Submission'}]

});

module.exports = mongoose.model("Assignment", assignmentSchema);