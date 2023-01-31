const sendToken = require("../utils/jwttoken");
const {sendEmail} = require("../utils/utils");
const crypto = require("crypto");
const ErrorHander = require("../utils/errorhandler");
const {User,Class,Submission , Assignment,Post} = require("../models");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose");

const ObjectId = require("mongoose").Types.ObjectId;


exports.createClass = catchAsyncErrors(async (req, res, next) => {
  const { user_id, className } = req.body;

  const classCode = crypto.randomBytes(10).toString("hex");

  const user = await User.findById(user_id);
  if (!user) {
    return next(new ErrorHander("User not found", 400));
  }
  const classroom = await Class.create({
    className,
    classCode,
    ownerId: user_id,
    ownerEmail: user.email,
  });

  user.classes.push(classroom._id);
  await user.save();

  res.status(201).json({
    success: true,
    message: "Classroom created successfully",
    classroom,
  });
});

exports.joinClass = catchAsyncErrors(async (req, res, next) => {
  const { user_id, classCode } = req.body;

  const classroom = await Class.findOne({ classCode });

  if (!classroom) {
    return next(new ErrorHander("Class not found", 400));
  }

  if (
    classroom.ownerId.equals(user_id) ||
    classroom.ownerId.equals(new ObjectId(user_id))
  ) {
    return next(new ErrorHander("You are teacher of this class", 400));
  }

  for (let item of classroom.students) {
    if (item.equals(user_id) || item.equals(new ObjectId(user_id))) {
      return next(new ErrorHander("You are already member of class ", 400));
    }
  }

  const user = await User.findById(user_id);
  classroom.students.push(user_id);
  await classroom.save();
  user.classes.push(classroom._id);
  await user.save();

  res.status(201).json({
    success: true,
    message: `${user.name} joined the ${classroom.className} class`,
    classroom,
  });
});

exports.fileUpload = catchAsyncErrors(async (req, res,next)=>{
  res.status(200).json({
    success: true,
    message:"File uploaded successfully",
    file:req.file
  })
})

exports.createAssignment = catchAsyncErrors(async (req, res,next)=>{
  const {classId} = req.params;
  const {title , description , points } = req.body;

  const _class = await Class.findById(classId);
  if(!_class){
    return next(new ErrorHander("Class not found"));
  }

  if(req.files.length === 0){
    return next(new ErrorHander("Select at least a file"));
  }
  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const assignment = await Assignment.create({
    title,description,points,classId,files
  })

  _class.assignments.push(assignment);
  await _class.save();

  res.status(201).json({
    success: true,
    message:"Assignment created successfully",
    assignment
  })
})

exports.getAllFiles = catchAsyncErrors(async (req, res, next)=>{
  let gfs;
  let conn = mongoose.connection;
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: "uploads"});

  gfs.find({}).toArray((err, files) => {
    // Check if files
    if(err){
      return next(new ErrorHander(err.message));
    }
    if (!files || files.length === 0) {
      return next(new ErrorHander("file not found"));
    }
    return res.json(files);
  });
} )

exports.getFile = catchAsyncErrors(async (req, res, next)=>{
  let gfs;
  const {filename} = req.params;
  let conn = mongoose.connection;
  const db = conn.db;
  gfs = new mongoose.mongo.GridFSBucket(db, {bucketName: "uploads"});

  gfs.find({filename}).toArray((err, files) => {
    if(err){
      return next(new ErrorHander(err.message));
    }
    if (!files || files.length === 0) {
      return next(new ErrorHander("file not found"));
    }

    // Files exist
    gfs.openDownloadStreamByName(filename).pipe(res);
  });
})

exports.submitAssignment = catchAsyncErrors(async (req, res, next)=>{
  const {assignmentid} = req.params;
  const {studentid} = req.body;

  if(req.files.length === 0){
    return next(new ErrorHander("Select at least a file"));
  }
  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const student = await User.findById(studentid);
  const assignment = await Assignment.findById(assignmentid);

  if(!student){
    return next(new ErrorHander("Student not found"));
  }
  if(!assignment){
    return next(new ErrorHander("Assignment not found"));
  }

  const grade = await Grade.create({
    studentId:studentid,
    assignmentId:assignmentid,
    studentEmail: student.email,
    assignmentName:assignment.title,
    totalMarks:assignment.points
  });

  let submissionStatus;
  if(!assignment.dueDate || Date.now() <= assignment.dueDate){
    submissionStatus = "Assigned";
  }else{
    submissionStatus = "Submitted Late";
  }


  const submission = await Submission.create({
    studentId:studentid,
    assignmentId:assignmentid,
    studentEmail: student.email,
    studentName:student.name,
    submissionStatus,
    assignmentName:assignment.title,
    files,
    grade
  });

  assignment.submissions.push(submission);
  await assignment.save();
  
  res.status(201).json({
    success:true,
    message:"Submitted Assignment successfully",
    submission
  })
});

exports.createPost = catchAsyncErrors(async(req,res,next)=>{
  const {description , postedBy} = req.body;
  const {classid} = req.params;

  if(req.files.length === 0){
    return next(new ErrorHander("Select at least a file"));
  }
  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const _class = await Class.findById(classid);
  if(!_class){
    return next(new ErrorHander("Class not found"));
  }

  const post = await Post.create({
    description,
    postedBy,
    classId:classid,
    files
  });

  _class.posts.push(post);
  await _class.save();

  res.status(201).json({
    success:true,
    message:"Post successfully created",
    post
  });
})

exports.getAllPostsAndAssignments = catchAsyncErrors(async(req,res,next)=>{
  const {classid} = req.params;
  const _class = await Class.findById(classid).populate('posts').populate({
    path:"assignments",
    populate:{
      path:"submissions"
    }
  });
  const posts = _class.posts;
  const assignments = _class.assignments;
  let data = [...posts, ...assignments];

  // retrieving in descending order of time created
  data = data.sort((a, b) => (b.createdAt - a.createdAt));

  res.status(200).json({
    success:true,
    message:"All posts and assignments retrieved successfully",
    posts,
    assignments,
    data
  })
})

exports.getAllSubmissions = catchAsyncErrors(async(req,res,next)=>{
  const {assignmentid} = req.params;
  const assignment = await Assignment.findById(assignmentid).populate({
    path:"submissions",
    populate:{
      path:"grade"
    }
  }).populate({
    path:"classId",
    populate:{
      path:"students"
    }
  })

  let notSubmitted = [];
  let submitted = [];
  assignment.classId.students.forEach(element => {
    let obj = assignment.submissions.find(o => o.studentId.equals(element._id));
    if(!obj){
      notSubmitted.push(element);
    }else{
      submitted.push(obj);
    }
  });

  res.status(200).json({
    success:true,
    message:"All Submissions retrieved successfully",
    assignment,
    notSubmitted,
    submitted
  })
})