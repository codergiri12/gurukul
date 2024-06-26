const sendToken = require("../utils/jwttoken");
const {sendEmail} = require("../utils/utils");
const crypto = require("crypto");
const ErrorHander = require("../utils/errorhandler");
const {User,Class,Submission , Assignment,Post, Grade, ExamReport} = require("../models");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose");

const ObjectId = require("mongoose").Types.ObjectId;

exports.getClass = (async (req, res, next) => {
  try{
    const {classid} =  req.params;
    const _class = await Class.findById(classid).populate("ownerId").populate("exams").populate("assignments").populate("students");
    res.status(200).json({
      success: true,
      class : _class
    })
  }catch(err){
    return next(new ErrorHander("Class not found",400));
  }
})

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

  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const assignment = await Assignment.create({
    title,description,points,classId,files,postedBy: _class.ownerId
  })

  _class.assignments.push(assignment);
  await _class.save();

  res.status(201).json({
    success: true,
    message:"Assignment created successfully",
    assignment
  })
})

exports.editAssignment = catchAsyncErrors(async(req,res,next)=>{
  const {title,points,description,dueDate} = req.body;
  const {assignmentId} = req.params;

  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const assignment = await Assignment.findByIdAndUpdate(assignmentId,{
    title,points,dueDate,
    description,
    files
  },{new:true});

  res.status(200).json({
    success:true,
    message:"Assignment successfully Updated",
    assignment
  });
})
exports.deleteAssignment = catchAsyncErrors(async(req,res,next)=>{
  const {classId,assignmentId} = req.params;
  console.log({classId,assignmentId})
  let _class;
  try{
    _class = await Class.findById(classId);
  }catch(err){
    return next(new ErrorHander("Class not Found",400));
  }

  await Assignment.findByIdAndDelete(assignmentId);

  const updatedClass = await Class.findByIdAndUpdate(classId,
    { $pull: { assignments: assignmentId } },
    { new: true }
  ).populate("assignments");

  res.status(200).json({
    success:true,
    message:"Assignment successfully Deleted",
    assignments:updatedClass.assignments
  });
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
  let student , assignment;
  try{
    student = await User.findOne({_id:studentid});
    assignment = await Assignment.findOne({_id:assignmentid});
  }catch(err){
    return next(new ErrorHander("Student or Assignment not exist",400));
  }

  Submission.findOneAndDelete({assignmentId:assignmentid , studentId:studentid}, (err,data)=>{
    if(err){
      return next(new ErrorHander(err.message,400));
    }
    if(!data) return null;
    Assignment.updateOne({_id:assignmentid }, { $pull: { submissions: data._id } }, function(err, dataNew){
      if(err){
        return next(new ErrorHander(err.message,401));
      }
    });
  });


  const grade = await Grade.create({
    studentId:studentid,
    assignmentId:assignmentid,
    studentEmail: student.email,
    assignmentName:assignment.title,
    totalMarks:assignment.points,
    classId : assignment.classId
  });

  let submissionStatus;
  if(!assignment.dueDate || Date.now() <= assignment.dueDate){
    submissionStatus = "Submitted";
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

exports.removeSubmission = catchAsyncErrors(async(req,res,next)=>{
  const {assignmentid,studentid} = req.params;

  let student , assignment;
  try{
    student = await User.findOne({_id:studentid});
    assignment = await Assignment.findOne({_id:assignmentid});
  }catch(err){
    return next(new ErrorHander("Student or Assignment not exist",400));
  }

  Submission.findOneAndDelete({assignmentId:assignmentid , studentId:studentid}, (err,data)=>{
    if(err){
      return next(new ErrorHander(err.message,400));
    }
    if(!data) return null;
    Assignment.updateOne({_id:assignmentid }, { $pull: { submissions: data._id } }, function(err, dataNew){
      if(err){
        return next(new ErrorHander(err.message,401));
      }
    });
  });

  res.status(201).json({
    success:true,
    message: "submission successfully removed"
  })
})
exports.createPost = catchAsyncErrors(async(req,res,next)=>{
  const {description , postedBy} = req.body;
  const {classid} = req.params;

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
exports.editPost = catchAsyncErrors(async(req,res,next)=>{
  const {description} = req.body;
  const {postId} = req.params;

  let files = [];

  req.files.map(file => files.push({
    fileName:file.filename,
    originalName:file.originalname
  }))

  const post = await Post.findByIdAndUpdate(postId,{
    description,
    files
  },{new:true});

  res.status(200).json({
    success:true,
    message:"Post successfully Updated",
    post
  });
})
exports.deletePost = catchAsyncErrors(async(req,res,next)=>{
  const {classId,postId} = req.params;

  let _class;
  try{
    _class = await Class.findById(classId);
  }catch(err){
    return next(new ErrorHander("Class not Found",400));
  }

  let post ;
  try{
    post = await Post.findByIdAndDelete(postId);
  }catch(err){
    return next(new ErrorHander("Post not found" , 400));
  }

  await Class.findByIdAndUpdate(classId,
    { $pull: { posts: postId } }
  );

  res.status(200).json({
    success:true,
    message:"Post successfully Deleted",
    post
  });
})
exports.getPost = (async(req,res,next)=>{
  
  try{
    const {postId} = req.params;
    const post = await Post.findById(postId).populate("postedBy");
    res.status(200).json({success:true,message:"Post retrieved successfully", post});
  }catch(err){
    return next(new ErrorHander("Post not found",400));
  }
})

exports.getAssignment = (async(req,res,next)=>{
  
  try{
    const {assignmentId, studentId} = req.params;
    const assignment = await Assignment.findById(assignmentId).populate("postedBy");
    const submission = await Submission.findOne({assignmentId, studentId}).populate("grade");
    res.status(200).json({success:true,message:"Assignment retrieved successfully", assignment,submission});
  }catch(err){
    // console.log(err);
    return next(new ErrorHander("Assignment not found",400));
  }
})

exports.getAllPostsAndAssignments = catchAsyncErrors(async(req,res,next)=>{
  const {classid} = req.params;
  const _class = await Class.findById(classid).populate({path:'posts',populate:{path:"postedBy"}}).populate({
    path:"assignments",
    populate:[{path:"postedBy"},{path:"submissions"}]
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
  let assignment;
  
  try{
    assignment = await Assignment.findById(assignmentid).populate({
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
  }catch(err){
    return next(new ErrorHander("Assignment not found",400));
  }

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

exports.getSubmission = catchAsyncErrors(async(req,res,next)=>{
  const {submissionid} = req.params;
  let submission;
  
  try{
    submission = await Submission.findById(submissionid).populate("grade").populate("assignmentId").populate("studentId");
  }catch(err){
    return next(new ErrorHander("Submission not found",400));
  }

  res.status(200).json({
    success:true,
    message:" Submission retrieved successfully",
    submission
  })
})

exports.assignGrade = catchAsyncErrors(async(req,res,next)=>{
  const {gradeId} = req.params;
  const {marks} = req.body;
  
  Grade.findByIdAndUpdate(gradeId,{marks , markingStatus:"Marked"},{new:true})
    .then((newGrade)=>{
      res.status(200).json({
        success:true,
        message:"Updated Grade successfully",
        grade : newGrade
      })
    })
    .catch((err)=>{
      return next(new ErrorHander(err.message + "  Error while updating grade",400));
    })
})
/*
{
  assignmentGrades : {
    "Giri" : {
      "6asfdafasdfasasdfasf" : "5/10",
      "fasdfasfasfasdfasfas" : "9/10"
    },
    'Ramesh': {
      "6asfdafasdfasasdfasf" : "9/10",
      "fasdfasfasfasdfasfas" : "9/10"
    }
  }
  examGrades : [
    {
      "name" : 'Giri',
      "marks" : {
        "6asfdafasdfasasdfasf" : "5/10",
        "fasdfasfasfasdfasfas" : "9/10"
      }
    },
    {
      "name" : 'Ramesh',
      "marks" : {
        "6asfdafasdfasasdfasf" : "9/10",
        "fasdfasfasfasdfasfas" : "9/10"
      }
    },
  ]
}
*/
exports.getAllGrades = catchAsyncErrors(async(req,res,next)=>{
  const {classId} = req.params;
  
  const gradeData = await Grade.find({classId:classId}).populate("assignmentId").populate("studentId");
  let assignmentGrades = {};

  gradeData.forEach((grade)=>{
    // console.log(grade);
    if(!assignmentGrades[grade.studentId.name])assignmentGrades[grade.studentId.name]={};
    assignmentGrades[grade.studentId.name][grade.assignmentId._id] = `${grade.marks}`
  })

  let examData = await ExamReport.find({classId:classId}).populate("userId").populate("examId");
  let examGrades = {};

  examData.forEach((grade)=>{
    // console.log(grade);
    if(!examGrades[grade.userId.name])examGrades[grade.userId.name]={};
    examGrades[grade.userId.name][grade.examId._id] = `${grade.score}`
  })

  res.status(200).json({
    assignmentGrades,examGrades
  })
})

