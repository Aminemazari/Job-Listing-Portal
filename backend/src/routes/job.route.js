const express = require("express");
const { postJobController } = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyTokenMiddleware");

const router = express.Router();

router.post("/post-job", verifyToken, postJobController);

module.exports = router;
