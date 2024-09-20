const mongoose = require("mongoose");

const employerProfile = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "must be a userId"],
		},
		companyName: String,
		description: String,
		address: String,
		country: String,
		city: String,
		companyWebSite: String,
		phoneNumber: String,
		LinkedinAccount: String,
		FacebookAccount: String,
		XAccount: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("seeker_profile", employerProfile);
