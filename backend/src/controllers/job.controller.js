const asyncHandler = require("express-async-handler");
const jobModel = require("../db/models/job.model");
const ApiError = require("../utils/apiError");

const postJobController = asyncHandler(async (req, res, next) => {
  // Get user-specific id for db operations
  const { userId } = req.user;

  // Get job information from request body to store in db
  const role = "seeker";
  const {
    title,
    companyName,
    tags,
    jobDescription,
    minimumSalary,
    maximumSalary,
    currency,
    country,
    city,
  } = req.body;

  // Check for missing required fields
  if (
    !title ||
    !companyName ||
    !jobDescription ||
    !minimumSalary ||
    !maximumSalary ||
    !currency ||
    !country ||
    !city
  ) {
    return next(new ApiError("Missing required fields", 400));
  }

  // Initialize the new Job Data for storing
  const newJobData = {
    userId,
    title,
    companyName,
    tags,
    role,
    salary: {
      minimumSalary,
      maximumSalary,
      currency,
    },
    location: { country, city },
    jobDescription,
  };

  // Check if job exists
  const jobExists = await jobModel.findOne({
    userId: userId,
    title: title.toLowerCase(),
    companyName: companyName.toLowerCase(),
    "location.country": country,
    "location.city": city,
  });

  if (jobExists) {
    // Handle Duplicate Jobs
    return res
      .status(400)
      .json({ message: "Job post already exists", success: false });
  } else {
    // Store job in db
    const newJobPost = await jobModel.create(newJobData);

    res.status(200).json({ status: "success", job: newJobPost });
  }
});

module.exports = { postJobController };
