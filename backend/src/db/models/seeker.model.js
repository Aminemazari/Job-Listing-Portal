const mongoose = require("mongoose");

const seekerProfile = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			unique: [true, "must be one user profile"],
		},
		birth_date: Date,
		resume: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "file",
		},
		country: String,
		city: String,
		phoneNumber: String,
		LinkedinAccount: String,
		FacebookAccount: String,
		XAccount: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("seeker_profile", seekerProfile);
