const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(user.id).populate("classes");
  } else {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  next();
});

//TODO: have to create isTeacher , isStudent functions

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };