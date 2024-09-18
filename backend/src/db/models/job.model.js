const mongoose = require("mongoose");
const userModel = require("./user.model");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: [true, "userId is required"],
      ref: userModel,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      lowercase: true,
    },
    companyName: {
      type: String,
      required: [true, "Company Name is required"],
      trim: true,
      lowercase: true,
    },
    tags: {
      type: [String],
      required: false,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    salary: {
      minimumSalary: { type: Number, required: true },
      maximumSalary: { type: Number, required: true },
      currency: { type: String, required: true, trim: true },
    },
    location: {
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
