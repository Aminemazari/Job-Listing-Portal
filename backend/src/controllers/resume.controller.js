const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const seekerProfile = require("../db/models/seeker.model");
const File = require("../db/models/file.model");
const mongoose = require("mongoose");
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// Set up AWS credentials
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
		publicReadAccess: true,
	},
});
const uploadResume = asyncHandler(async (req, res) => {
	const session = await mongoose.startSession();
	// upload resume
	const params = {
		Bucket: process.env.BUCKET_NAME,
		Key: req.file.originalname.trim(),
		Body: req.file.buffer,
		ContentDisposition: "inline",
		ContentType: req.file.mimetype,
	};

	try {
		await s3Client.send(new PutObjectCommand(params));
		const fileUrl = `https://${
			process.env.BUCKET_NAME
		}.s3.amazonaws.com/${req.file.originalname.trim()}`;
		const file = new File({
			key: params.Key,
			name: req.file.originalname.trim(),
			mime_type: req.file.mimetype,
			size: req.file.size,
			url: fileUrl,
		});
		// check if user have resume (create or update UserProfile)
		const user = await seekerProfile.find({ user_id: req.user.id });
		console.log(user);
		await session.startTransaction();
		let result;
		if (!user.length) {
			// create a seeker Profile and saving the File
			const data = await file.save();
			const resul = await seekerProfile.create({
				resume: data._id,
				user_id: req.user.id,
			});
			result = await seekerProfile.findById(resul._id).populate("resume");
		} else {
			const data = await file.save();
			result = await seekerProfile
				.updateOne(
					{ user_id: req.user.id },
					{ $set: { resume: data._id } },
					{ new: true }
				)
				.populate("resume");
		}
		// End the transaction
		await session.commitTransaction();
		res.status(200).json({ msg: "File Uploaded Successfully", data: result });
	} catch (err) {
		console.error(err);
		res.status(500).send("Failed to upload file");
	}
});

const downloadResume = asyncHandler(async (req, res) => {
	const { filename } = req.params;
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.BUCKET_NAME,
			Key: filename.trim(),
		});
		const response = await s3Client.send(command);
		// Set headers for file download
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${filename.trim()}"`
		);
		res.setHeader("Content-Type", response.ContentType);
		// Stream the file content to the response
		response.Body.pipe(res);
	} catch (error) {
		res.status(404).send("File Not Found");
	}
});

module.exports = { uploadResume, downloadResume };
