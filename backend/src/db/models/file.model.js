const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: [true, "Must be a key"],
		},
		name: {
			type: String,
			required: [true, "Must be a name"],
		},
		size: Number,
		mime_type: String,
		url: {
			type: String,
			required: [true, "Must be Valid Url"],
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("file", fileSchema);
