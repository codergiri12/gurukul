const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  name:{type: String , required: [true , "Please enter name of exam"]},
  topic:{type: String , required: [true , "Please enter topic of exam"]},
  duration : {type: Number , required:true},
  questions : [{type: Schema.Types.ObjectId , ref : "Question"}],
  totalMarks : {type: Number , required:[true , "Please enter total marks"]},
  expiry : {type : Date , default : null},
  classId : {type:Schema.Types.ObjectId,ref:"Class"}
});

module.exports = mongoose.model("Exam", examSchema);