const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Application = require("../db/models/application.model");
const sendEmail = require("../utils/sendEmail");
const applyJob = asyncHandler(async (req, res, next) => {
	let data;
	// JobId from params
	const { id } = req.params;
	// userId from TokenMiddleware
	const userId = req.user.id;
	data = await Application.create({
		applicant_id: userId,
		...req.body,
		job_id: id,
	});
	res.status(200).json({ data, msg: "Submitted Application" });
});

const getApplication = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	// update the status of application to the review
	await Application.findByIdAndUpdate(id, { status: "in review" });
	const data = await Application.findById(id).populate("user_id job_id resume");
	if (!data) {
		return next(
			new ApiError(`There is no Application with this id ${id}`, 404)
		);
	}
	res.status(200).json(data);
});

const getJobApplication = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const data = await Application.findOne({ job_id: id }).populate(
		"applicant_id job_id resume"
	);
	res.status(200).json(data);
});
const getUserApplication = asyncHandler(async (req, res) => {
	const data = await Application.findOne({
		applicant_id: req.user.id,
	}).populate("applicant_id job_id resume");
	res.status(200).json(data);
});

const manageCandidate = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const data = await Application.findById(id);
	if (!data) {
		return next(
			new ApiError(`There is no Application with this id ${id}`, 404)
		);
	}
	const result = await Application.findByIdAndUpdate(id, {
		status: req.body.status,
	}).populate("applicant_id job_id");
	// Send Email To Seeker Base on status
	let message;
	if (req.body.status === "rejected") {
		message = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Application Status Update</h2>
<p style="color: #555;">Hello ${result.applicant_id.username},</p>

<p style="color: #555;">Thank you for applying to the position at our company. After careful consideration, we regret to inform you that your application has not been successful at this time.</p>

<p style="color: #555;">We encourage you to apply for other opportunities that may align with your skills and interests in the future.</p>

<p style="color: #555;">Best regards,<br>Your Hiring Team</p>
    </div>
</div>`;
	} else {
		message = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Congratulations!</h2>
<p style="color: #555;">Hello ${result.applicant_id.username},</p>

<p style="color: #555;">We are excited to inform you that you have been selected for the position you applied for. Welcome to the team! We will be in touch soon with the next steps and further details.</p>

<p style="color: #555;">
    <span style="display: inline-block; padding: 8px 12px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 4px;">You're Hired!</span>
</p>

<p style="color: #555;">We look forward to working with you!</p>

<p style="color: #555;">Best regards,<br>Your Hiring Team</p>
    </div>
</div>`;
	}
	try {
		await sendEmail({
			email: result.applicant_id.email,
			subject: `Application Status To ${result.job_id.title}`,
			message,
		});
	} catch (err) {
		return next(
			new ApiError(
				"There is an error in the Sending Email . Please try again",
				500
			)
		);
	}
	res.status(200).json({
		success: true,
		message: "Application successfully managed",
	});
});

module.exports = {
	applyJob,
	getApplication,
	getUserApplication,
	getJobApplication,
	manageCandidate,
};
