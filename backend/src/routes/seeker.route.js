const express = require("express");
const { uploadFile } = require("../middlewares/uploadResume");
const {
	getUserProfile,
	updateProfile,
	createProfile,
} = require("../controllers/seeker.controller");
const router = express.Router();
const { allowedTo, protect } = require("../controllers/auth.controller");

router.use(protect, allowedTo("seeker"));
router.route("/").post(createProfile);
router.route("/:id").get(getUserProfile).put(updateProfile);
module.exports = router;
