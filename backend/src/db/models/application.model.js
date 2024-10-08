const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
	{
		job_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Job",
			required: [true, "must be a userId"],
		},
		applicant_id: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: [true, "must be a user"],
			unique: [true, "must be one application per user"],
		},
		status: {
			type: String,
			enum: ["submitted", "in review", "rejected", "hired"],
			default: "submitted",
		},
		resume: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "file",
		},
		portfolio_url: String,
		coverLetter: String,
	},
	{ timestamps: true }
);

// Pre-save hook to set the default resume from the user's profile
applicationSchema.pre("save", async function (next) {
	// Only set resume if it's not already provided
	if (!this.resume) {
		try {
			const seeker = await mongoose
				.model("seeker_profile")
				.findOne({ user_id: this.applicant_id })
				.select("resume");
			if (seeker && seeker.resume) {
				this.resume = seeker.resume; // Set resume to user's profile resume
			}
		} catch (error) {
			return next(error);
		}
	}
	next();
});

module.exports = mongoose.model("Application", applicationSchema);
