const express = require("express");
const {
	postJobController,
	searchJob,
	editJob,
	deleteJob,
	getJobById,
} = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const { allowedTo, protect } = require("../controllers/auth.controller");
const router = express.Router();
router.use(protect);
router.post("/post-job", allowedTo("employer"), postJobController);
router.get("/", searchJob);
router
	.route("/:id")
	.get(getJobById)
	.put(allowedTo("employer"), editJob)
	.delete(allowedTo("employer"), deleteJob);
module.exports = router;
