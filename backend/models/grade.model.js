const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  studentId:{type:Schema.Types.ObjectId,ref:"User"},
  assignmentId:{type:Schema.Types.ObjectId,ref:"Assignment"},
  classId:{type:Schema.Types.ObjectId,ref:"Class"},
  studentEmail:{type:String,required:true},
  assignmentName:{type:String,required:true},
  marks:{type:Number,default:0},
  totalMarks:{type:Number}, // if student got 9/10 then totalMarks is 10 and grade is 9
  markingStatus: {type: String,enum:["Marked", "UnMarked"],default:"UnMarked"},
});

module.exports = mongoose.model("Grade", gradeSchema);