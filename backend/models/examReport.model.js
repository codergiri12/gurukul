const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examReportSchema = new Schema({
  examId : {type: Schema.Types.ObjectId, ref: "Exam"},
  userId : {type: Schema.Types.ObjectId, ref: "User"},
  remainingTime : {type:Number},
  selectedOptions : {type:Object},
  score:{type:Number}
});

module.exports = mongoose.model("ExamReport", examReportSchema);