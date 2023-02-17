const router = require("express").Router();

const { getAllSubmissions,createPost,submitAssignment,getAllFiles,createClass, joinClass,fileUpload, createAssignment, getFile, getAllPostsAndAssignments, getClass, getPost, getAssignment, removeSubmission } = require("../controllers/class");

const { isAuthenticatedUser} = require("../middleware/auth");
const { upload } = require("../utils/utils");

router.route("/create").post(createClass);
router.route("/join").post(joinClass);
router.route("/upload").post( upload.single("img"), fileUpload)
router.route("/files").get(getAllFiles);
router.route("/file/:filename").get(getFile);
router.route("/createAssignment/:classId").post( upload.array("files"), createAssignment)
router.route("/submitAssignment/:assignmentid").post(upload.array("files"), submitAssignment);
router.route("/unsubmitAssignment/:assignmentid/:studentid").delete(removeSubmission);
router.route("/createPost/:classid").post(upload.array("files"),createPost);
router.route("/get_posts_assignments/:classid").get(getAllPostsAndAssignments);
router.route("/getPost/:postId").get(getPost);
router.route("/getAssignment/:assignmentId/:studentId").get(getAssignment);
router.route("/submissions/:assignmentid").get(getAllSubmissions);
router.route("/:classid").get(getClass)
module.exports = router;