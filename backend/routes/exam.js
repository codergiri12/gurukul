const {
  createExam,
  createQuestion,
  getExams,
  getQuestions,
  getExam,
  deleteExam,
  deleteQuestion,
  editExam,
  editQuestion,
  getExamReport,
} = require("../controllers/exam");

const router = require("express").Router();

router.route("/exams/:classId").get(getExams);
router.route("/getExamReport/:userId/:examId").get(getExamReport);
router.route("/questions/:examId").get(getQuestions);
router.route("/question/:questionId").delete(deleteQuestion);
router.route("/createExam/:classId").post(createExam);
router.route("/editExam/:examId").put(editExam);
router.route("/editQuestion/:questionId").put(editQuestion);
router.route("/createQuestion/:examId").post(createQuestion);
router.route("/deleteExam/:classId/:examId").delete(deleteExam);
router.route("/:examId").get(getExam);

module.exports = router;
