const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  studentId:{type:Schema.Types.ObjectId,ref:"User"},
  assignmentId:{type:Schema.Types.ObjectId,ref:"Assignment"},
  studentEmail:{type:String,required:true},
  studentName:{type:String,required:true},
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  submissionStatus: {type: String,enum:["Assigned", "Submitted Late","Pending"],default:"Pending"},
  assignmentName:{type:String,required:true},
  privateComments:{type:Array},
  files:[{type:Object}],
  grade:{type:Schema.Types.ObjectId,ref:"Grade"}
});

module.exports = mongoose.model("Submission", submissionSchema);