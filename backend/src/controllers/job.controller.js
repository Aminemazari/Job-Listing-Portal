const asyncHandler = require("express-async-handler");
const jobModel = require("../db/models/job.model");
const userModel = require("../db/models/user.model");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeature");

const postJobController = asyncHandler(async (req, res, next) => {
	// Get user-specific id for db operations
	const userId = req.user.id;

	// Get job information from request body to store in db
	const {
		title,
		companyName,
		tags,
		role,
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
		!role ||
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
const editJob = asyncHandler(async (req, res, next) => {
	// get data from body
	const {
		title,
		companyName,
		tags,
		role,
		jobDescription,
		minimumSalary,
		maximumSalary,
		currency,
		country,
		city,
	} = req.body;
	const { id } = req.params;
	const job = await jobModel.findById(id);
	if (!job) {
		return next(new ApiError(`There is no job with this id ${id}`, 404));
	}
	const newJobData = {
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
	const data = await jobModel.findByIdAndUpdate(id, newJobData, { new: true });
	res.status(200).json(data);
});

const getJobById = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const job = await jobModel.findById(id);
	if (!job) {
		return next(new ApiError(`There is no job with this id ${id}`, 404));
	}
	res.status(200).json(job);
});

const deleteJob = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const job = await jobModel.findByIdAndDelete(id);
	if (!job) {
		return next(new ApiError(`There is no job with this id ${id}`, 404));
	}
	res.status(204).end();
});

const searchJob = asyncHandler(async (req, res, next) => {
	const count = await jobModel.countDocuments();
	const docApi = new ApiFeatures(jobModel.find({}), req.query)
		.paginate(count)
		.filter()
		.sort()
		.search()
		.limitFields();
	const { mongooseQuery, paginationResult } = docApi;
	const document = await mongooseQuery;

	res
		.status(200)
		.json({ results: document.length, paginationResult, data: document });
});

module.exports = {
	postJobController,
	deleteJob,
	getJobById,
	editJob,
	searchJob,
};
