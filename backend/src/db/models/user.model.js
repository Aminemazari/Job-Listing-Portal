const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "username is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			unique: true,
			lowercase: true,
		},
		profileImage: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
		},
		password: {
			type: String,
			validate: {
				validator: function (value) {
					return this.googleId || this.linkedinId || value; // If OAuth, password can be null
				},
				message: "The password is required",
			},
			minlength: [6, "Too short password"],
		},
		role: {
			type: String,
			validate: {
				validator: function (value) {
					return this.googleId || this.linkedinId || value; // If OAuth, role can be null
				},
				message: "The role is required for non-oauth users",
			},
			enum: ["employer", "seeker"],
		},
		verifyCode: String,
		verifyCodeExpire: Number,
		verifyCodeVerified: Boolean,
		googleId: String,
		linkedinId: String,
		resetPasswordCode: String,
		resetPasswordExpire: String,
		passwordResetVerified: Boolean,
	},
	{
		timestamps: true,
	}
);
userSchema.pre("save", async function (next) {
	if (!this.password || !this.isModified("password")) return next();
	// hashing the password
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = mongoose.model("User", userSchema);
