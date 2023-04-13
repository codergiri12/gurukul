const {Exam , Question, Class, ExamReport, User} = require("../models");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhandler");
const { v4: uuidv4 } = require('uuid');

exports.getExams = catchAsyncErrors(async (req, res,next)=>{
  const {classId} = req.params;
  let _class;
  try{
    _class = await Class.findById(classId).populate("exams");
  }catch(err){
    return next(new ErrorHander("Class not found",400));
  }
  res.status(200).json({
    success: true,
    message: "Exams retrieved successfully",
    exams : _class.exams
  })
})
exports.getExam = catchAsyncErrors(async (req, res,next)=>{
  const {examId} = req.params;
  let exam;
  try{
    exam = await Exam.findById(examId).populate("questions");
  }catch(err){
    return next(new ErrorHander("Exam not found",400));
  }
  res.status(200).json({
    success: true,
    message: "Exam retrieved successfully",
    exam : exam
  })
})
exports.getQuestions = catchAsyncErrors(async (req, res,next)=>{
  const {examId} = req.params;
  let exam;
  try{
    exam = await Exam.findById(examId).populate("questions");
  }catch(err){
    return next(new ErrorHander("Exam not found",400));
  }
  res.status(200).json({
    success: true,
    message: "Questions retrieved successfully",
    questions : exam.questions
  })
})

exports.createExam = catchAsyncErrors(async (req, res, next) => {
  const {name , topic , duration , expiry , totalMarks} = req.body;
  const {classId} = req.params;

  let _class;
  try{
    _class = await Class.findById(classId);
  }catch(err){
    return next(new ErrorHander("Class not found",400));
  }
  const exam = await Exam.create({classId,name, topic, duration:duration*60, expiry, totalMarks});

  _class.exams.push(exam);
  await _class.save();

  res.status(201).json({
    success: true,
    message:"Exam created successfully",
    exam
  })
})
exports.editExam = catchAsyncErrors(async (req, res, next) => {
  const {name , topic , duration , expiry , totalMarks} = req.body;
  const {examId} = req.params;

  const exam = await Exam.findByIdAndUpdate(examId , {name, topic, duration:duration*60, expiry, totalMarks});

  const latestClass = await Class.findById(exam.classId).populate("exams");

  res.status(201).json({
    success: true,
    message:"Exam Edited successfully",
    exams: latestClass.exams
  })
})



exports.deleteExam = catchAsyncErrors(async (req, res, next) => {
  const {classId , examId} = req.params;

  let _class;
  try{
    _class = await Class.findById(classId);
  }catch(err){
    return next(new ErrorHander("Class not found",400));
  }
  let exam;
  try{
    exam = await Exam.findById(examId);
  }catch(err){
    return next(new ErrorHander("Exam not found",400));
  }

  const deletedExam = await Exam.findByIdAndDelete(examId);
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { exams: examId } },
    { new: true }
  ).populate("exams");

  await Question.deleteMany({ examId: examId });

  res.status(202).json({
    success: true,
    message:"Exam deleted successfully",
    exam : deletedExam,
    updatedClass
  })
})

exports.createQuestion = catchAsyncErrors(async(req, res, next)=>{
  const {name , options , answer} = req.body;
  const {examId } = req.params;

  let exam;
  try{
    exam = await Exam.findById(examId);
  }catch(err){
    return next(new ErrorHander("Exam not found" , 400));
  }

  const question = await Question.create({examId, name, options, answer});
  exam.questions.push(question);
  await exam.save();

  res.status(201).json({
    success: true,
    message:"Question created successfully",
    question
  })
})

exports.editQuestion = catchAsyncErrors(async (req, res, next) => {
  const {name , options , answer} = req.body;
  const {questionId} = req.params;

  const question = await Question.findByIdAndUpdate(questionId , {name, options , answer});

  const latestExam = await Exam.findById(question.examId).populate("questions");

  res.status(200).json({
    success: true,
    message:"Question Edited successfully",
    questions: latestExam.questions
  })
})


exports.deleteQuestion = catchAsyncErrors(async(req, res, next)=>{
  const {questionId } = req.params;

  let question;
  try{
    question = await Question.findByIdAndDelete(questionId);
  }catch(err){
    return next(new ErrorHander("Question not found" , 400));
  }

  const updatedExam = await Exam.findByIdAndUpdate(
    question.examId,
    { $pull: { questions: questionId } },
    { new: true }
  ).populate("questions");

  res.status(201).json({
    success: true,
    message:"Question deleted successfully",
    question,
    updatedExam
  })
})


exports.getExamReport = catchAsyncErrors(async(req, res, next)=>{
  const {userId , examId} = req.params;
  let exam;
  try{
    exam = await Exam.findById(examId).populate("questions");
  }catch(err){
    return next(new ErrorHander("Exam not found" , 400));
  }
  let user;
  try{
    user = await User.findById(userId);
  }catch(err){
    return next(new ErrorHander("user not found" , 400));
  }
  const examReport = await ExamReport.findOne({userId , examId });
  console.log(examReport)
  if(examReport){
    res.status(200).json({examReport,exam,questions:exam.questions});
  }else{
    const newReport = await ExamReport.create({userId , examId, remainingTime : exam.duration , selectedOptions: {}});
    res.status(201).json({examReport:newReport , exam,questions:exam.questions});
  }
})

exports.getExamResultAfterCompletion = async(examReportId)=>{
  const examReport = await ExamReport.findById(examReportId).populate({path:"examId",populate: {path:"questions"}});
  let score = 0, perQuestionScore = examReport.examId.totalMarks/examReport.examId.questions.length;
  examReport.examId.questions.forEach((question,id)=>{
    if(examReport.selectedOptions[id] && examReport.selectedOptions[id]===question.answer){
      score += perQuestionScore;
    }
  })
  await ExamReport.findByIdAndUpdate(examReportId,{score:score,remainingTime:-1});
  return {examReport , score};
}