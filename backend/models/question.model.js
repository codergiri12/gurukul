const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  examId : {type: Schema.Types.ObjectId, ref: "Exam"},
  name:{type: String , required: [true , "Please enter Question"]},
  options : [{type: String}],
  answer : {type : Number } //index of answer.
});

module.exports = mongoose.model("Question", questionSchema);