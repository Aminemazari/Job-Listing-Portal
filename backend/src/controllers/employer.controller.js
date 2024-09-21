const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Employer = require("../db/models/employer.model");

const createProfile = asyncHandler(async (req, res) => {
	const data = await Employer.create({ ...req.body, user_id: req.user.id });
	res.status(200).json(data);
});

const updateProfile = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const data = await Employer.findById(id);
	if (!data) {
		return next(new ApiError(`There is no Profile with this id ${id}`, 404));
	}
	const newData = await Employer.findByIdAndUpdate(id, req.body, { new: true });
	res.status(200).json({ data: newData });
});

const getUserProfile = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const data = await Employer.findById(id).populate("user_id");
	if (!data) {
		return next(new ApiError(`There is no Profile with this id ${id}`, 404));
	}
	res.status(200).json(data);
});

module.exports = { getUserProfile, updateProfile, createProfile };
