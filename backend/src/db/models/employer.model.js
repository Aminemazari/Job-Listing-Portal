const mongoose = require("mongoose");

const employerProfile = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "must be a userId"],
			unique: [true, "must be one user profile"],
		},
		companyName: String,
		description: String,
		addresse: {
			id: { type: mongoose.Schema.Types.ObjectId },
			alias: String,
			details: String,
			phone: String,
			city: String,
			postalCode: String,
		},
		companyWebSite: String,
		LinkedinAccount: String,
		FacebookAccount: String,
		XAccount: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("employer_profile", employerProfile);
