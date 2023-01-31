const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  ownerId:{ type: Schema.Types.ObjectId, ref: 'User' },
  ownerEmail:{ type: String,required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  className: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  assignments : [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
  // notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }]
});

module.exports = mongoose.model("Class", classSchema);