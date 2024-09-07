const express = require("express");

const {
	signUpController,
	codeVerification,
	signInController,
	resendVerificationCode,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/verifyCode", codeVerification);
router.post("/signIn", signInController);
router.post("/resendVerifyCode", resendVerificationCode);

module.exports = router;
