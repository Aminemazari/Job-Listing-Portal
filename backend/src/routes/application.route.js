const express = require("express");
const {
	applyJob,
	getApplication,
	getUserApplication,
	getJobApplication,
	manageCandidate,
} = require("../controllers/application.controller");
const router = express.Router();
const { allowedTo, protect } = require("../controllers/auth.controller");

router.get("/app/:id", protect, allowedTo("employer"), getApplication);
router.get("/job/:id", protect, allowedTo("employer"), getJobApplication);
router.put("/app/:id", protect, allowedTo("employer"), manageCandidate);
router.use(protect, allowedTo("seeker"));
router.route("/:id").post(applyJob);
router.get("/user", getUserApplication);
module.exports = router;
