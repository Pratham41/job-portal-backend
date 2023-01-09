// MONGOOSE
const mongoose = require("mongoose");

const applySchema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    resume: {
      type: String,
    },
    cover_letter: {
      type: String,
    },
  });

// JOB SCHEMA
const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    required_skills: {
      type: String,
    },
    experience_level: {
      type: String,
    },
    applied_by: [applySchema],
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports = Jobs;
