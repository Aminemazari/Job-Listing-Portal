const express = require("express");
const { uploadFile } = require("../middlewares/uploadResume");
const {
	uploadResume,
	consultResumeFile,
	downloadResume,
} = require("../controllers/resume.controller");
const router = express.Router();
const { allowedTo, protect } = require("../controllers/auth.controller");

router
	.route("/")
	.post(protect, allowedTo("seeker"), uploadFile("resume"), uploadResume);
router.get("/:filename", downloadResume);
module.exports = router;
