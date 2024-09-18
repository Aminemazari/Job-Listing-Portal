const asyncHandler = require("express-async-handler");
const userModel = require("../db/models/user.model");
const {
  signUpValidation,
  signInValidation,
} = require("../utils/validations/auth.validation");
const createToken = require("../utils/createToken");
const ApiError = require("../utils/apiError");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
/*
@desc Sign up new user
@route /api/auth/signup
@method POST
@access public
*/
const signUpController = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  const { error } = signUpValidation(req.body);
  if (error) {
    return next(new ApiError(`Validation Error , ${error}`, 400));
  }
  // 1-check if the email Exist
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return next(
      new ApiError(`This ${req.body.email} Email Already in used`, 400)
    );
  }
  // return res.end();
  // 2-save user in db
  user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  // 3) If user exists , generate 6 digits and save it in db
  const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();

  const hashedCode = crypto
    .createHash("sha256")
    .update(verifyCode)
    .digest("hex");
  // save into db
  user.verifyCode = hashedCode;
  user.verifyCodeExpire = Date.now() + 60 * 60 * 1000; // 60 minutes (1 hour)
  user.verifyCodeVerified = false;
  await user.save();
  // 4) send reset code via email
  const message = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Verification Code</h2>
        <p style="color: #555;">Hello ${user.username},</p>

        <p style="color: #555;">You have requested to sign up To Job-Listing-App. Please use the following verification code:</p>

        <p style="color: #555;">
            <span style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">${verifyCode}</span>
        </p>

        <p style="color: #555;">If you did not request creating account in our platform , please ignore this email.</p>

        <p style="color: #555;">Best regards,<br>Your Website Team</p>
    </div>

</div>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your verification code (Valid for 1 Hour)",
      message,
    });
  } catch (err) {
    user.verifyCode = undefined;
    user.verifyCodeExpire = undefined;
    user.verifyCodeVerified = undefined;

    await user.save();
    return next(
      new ApiError(
        "There is an error in the Sending Email . Please try again",
        500
      )
    );
  }
  res.status(200).json({
    success: true,
    message: "verification code sent to your email",
  });
});

/*
@desc Sign up new user
@route /api/auth/verifyCode
@method POST
@access public
*/
const codeVerification = asyncHandler(async (req, res, next) => {
  // 1) Get the user based on the reset code
  const hashedVerifyCode = crypto
    .createHash("sha256")
    .update(req.body.verifyCode)
    .digest("hex");
  const user = await userModel.findOne({
    verifyCode: hashedVerifyCode,
    verifyCodeExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Verify Code invalid or expired ", 404));
  }
  user.verifyCode = undefined;
  user.verifyCodeExpire = undefined;
  user.verifyCodeVerified = true;

  await user.save();
  res.status(200).json({ status: "success" });
});
/*
@desc Sign up new user
@route /api/auth/signIn
@method POST
@access public
*/
const signInController = asyncHandler(async (req, res, next) => {
  // 1. Validate the input
  const { error } = signInValidation(req.body);
  if (error) {
    return next(new ApiError(`Validation Error , ${error}`, 400));
  }
  // 2) check if the user are exist
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid email or password"), 401);
  }
  // 3) check if user is verified
  if (user.verifyCodeVerified === false) {
    return next(new ApiError("verify The Email Please"), 401);
  }
  // 4) generate jwt
  const token = createToken(user._id);

  // Storing generated token for future use in cookie
  res.cookie("jwt", token, {
    httpOnly: true, // To prevent XSS attacks
  });

  // 5) send response to client
  res.status(200).json({ data: user, token });
});
const resendVerificationCode = asyncHandler(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user || user.verifyCodeVerified === true) {
    return next(new ApiError(` ${req.body.email} Email Not Found`, 400));
  }
  const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();

  const hashedCode = crypto
    .createHash("sha256")
    .update(verifyCode)
    .digest("hex");
  // save into db
  user.verifyCode = hashedCode;
  user.verifyCodeExpire = Date.now() + 60 * 60 * 1000; // 60 minutes (1 hour)
  user.verifyCodeVerified = false;
  await user.save();
  // 4) send reset code via email
  const message = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Verification Code</h2>
        <p style="color: #555;">Hello ${user.username},</p>

        <p style="color: #555;">You have requested to sign up To Job-Listing-App. Please use the following verification code:</p>

        <p style="color: #555;">
            <span style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">${verifyCode}</span>
        </p>

        <p style="color: #555;">If you did not request creating account in our platform , please ignore this email.</p>

        <p style="color: #555;">Best regards,<br>Your Website Team</p>
    </div>

</div>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your verification code (Valid for 1 Hour)",
      message,
    });
  } catch (err) {
    user.verifyCode = undefined;
    user.verifyCodeExpire = undefined;
    user.verifyCodeVerified = undefined;

    await user.save();
    return next(
      new ApiError(
        "There is an error in the Sending Email . Please try again",
        500
      )
    );
  }
  res.status(200).json({
    success: true,
    message: "verification code sent to your email",
  });
});
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: "you are not authenticated" });
};

const setUpRole = asyncHandler(async (req, res, next) => {
  // get the userId and role
  const id = req.params.id;
  // 2) check if the user are exist
  let user = await userModel.findById(id);
  if (!user) {
    return next(new ApiError("Invalid user Id"), 401);
  }
  // 3) check if user is verified
  if (!user.googleId && !user.linkedinId) {
    return next(
      new ApiError("User Not Associated neither Linkedin or Google"),
      401
    );
  }
  // 4) update User
  user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  // 5) generate jwt
  const token = createToken(user._id);

  // 6) send response to client
  res
    .status(200)
    .redirect(`${process.env.CLIENT_HOST}/dashboard?token=${token}`);
});

// Forget Password
const forgetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email address;

  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }
  // 2) If user exists , generate 6 digits and save it in db
  const resetCode = Math.floor(Math.random() * 900000 + 100000).toString();

  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  // save into db
  user.resetPasswordCode = hashedResetCode;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  user.passwordResetVerified = false;
  await user.save();

  // 3) send reset code via email
  const message = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Password Reset</h2>
        <p style="color: #555;">Hello ${user.username},</p>

        <p style="color: #555;">You have requested to reset your password. Please use the following reset code:</p>

        <p style="color: #555;">
            <span style="display: inline-block; padding: 8px 12px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">${resetCode}</span>
        </p>

        <p style="color: #555;">If you did not request a password reset, please ignore this email.</p>

        <p style="color: #555;">Best regards,<br>Your Website Team</p>
    </div>

</div>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your reset code (Valid for 30 minutes)",
      message,
    });
  } catch (err) {
    user.resetPasswordCode = undefined;
    user.resetPasswordExpire = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(
      new ApiError(
        "There is an error in the Sending Email . Please try again",
        500
      )
    );
  }
  res.status(200).json({
    success: true,
    message: "Reset code sent to your email",
  });
});
// @desc verify Reset code
// @route POST api/v1/auth/verifyResetCode
// @access Public
const verifyResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get the user based on the reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordCode: hashedResetCode,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Reset Code invalid or expired ", 404));
  }

  user.passwordResetVerified = true;

  await user.save();
  res.status(200).json({ status: "success" });
});

// @desc Set new Password
// @route POST api/v1/auth/setPassword
// @access Public
const setNewPassword = asyncHandler(async (req, res, next) => {
  // 1) Get the user based on the email

  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`There is no user with this email ${req.body.email}`, 404)
    );
  }
  // 2) check if the reset code is verified
  if (!user.passwordResetVerified) {
    return next(new ApiError("Please verify your reset code ", 404));
  }

  user.password = req.body.newPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  // 3) if everything is ok generate token
  const token = createToken(user._id);
  res.status(200).json({
    success: true,
    token,
  });
});
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new ApiError(`No user found with this id : ${userId}`));
  }
  res.status(200).json({ user });
});
module.exports = {
  signUpController,
  codeVerification,
  signInController,
  resendVerificationCode,
  ensureAuthenticated,
  setUpRole,
  setNewPassword,
  verifyResetCode,
  forgetPassword,
  getUserById,
};
