const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Seeker = require("../db/models/seeker.model");

const createProfile = asyncHandler(async (req, res) => {
	const seeker = await Seeker.findOne({ user_id: req.user.id });
	let data;
	if (seeker) {
		data = await Seeker.updateOne({ user_id: req.user.id }, req.body, {
			new: true,
		});
	} else {
		data = await Seeker.create({ ...req.body, user_id: req.user.id });
	}
	res.status(200).json({ msg: "Successfull operation" });
});

const updateProfile = asyncHandler(async (req, res, next) => {
	const data = await Seeker.findOne({ user_id: req.user.id });
	if (!data) {
		return next(new ApiError(`There is no Profile with this id ${id}`, 404));
	}
	const newData = await Seeker.findByIdAndUpdate(data._id, req.body, {
		new: true,
	});
	res.status(200).json({ data: newData });
});

const getUserProfile = asyncHandler(async (req, res, next) => {
	const data = await Seeker.findOne({ user_id: req.user.id }).populate(
		"resume"
	);
	if (!data) {
		return next(new ApiError(`There is no Profile For this User`, 404));
	}
	res.status(200).json(data);
});

module.exports = { getUserProfile, updateProfile, createProfile };
