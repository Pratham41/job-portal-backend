const Jobs = require("../model/job");
const errorFunction = require("../utils/errorFunction");

const createJob = async (req, res) => {
  try {
    const job = await Jobs.create({
      title: req.body.title,
      description: req.body.description,
      email: req.body.email,
      required_skills: req.body.required_skills,
      experience_level: req.body.experience_level,
    });
    if (job) {
      return res.status(201).json(errorFunction(false, "New Job Created", job));
    } else {
      return res.status(400).json(errorFunction(true, "Error Creating Job"));
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorFunction(true, "Error Adding Job"));
  }
};

const listAllFilterJob = async (req, res) => {
  try {
    const filter = {};
    if (
      typeof req.body.required_skills != "undefined" &&
      typeof req.body.experience_level != "undefined"
    ) {
      filter.required_skills = req.body.required_skills;
      filter.experience_level = req.body.experience_level;
    }
    const jobs = await Jobs.find(filter,{applied_by:0});

    if (jobs) {
      return res
        .status(201)
        .json(errorFunction(false, "All Jobs Based On Filter", jobs));
    } else {
      return res.status(400).json(errorFunction(true, "Error Getting Job"));
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorFunction(true, "Something went wrong"));
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id,{applied_by:0});

    if (job) {
      return res.status(201).json(errorFunction(false, "Job Details", job));
    } else {
      return res.status(400).json(errorFunction(true, "Error Getting Job"));
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorFunction(true, "Something went wrong"));
  }
};

const getJobPostedByOwn = async (req, res) => {
    try {
      const { email } = req.body;
      const jobs = await Jobs.find({email});
  
      if (jobs) {
        return res.status(201).json(errorFunction(false, "Jobs Posted By You", jobs));
      } else {
        return res.status(400).json(errorFunction(true, "Error Getting Jobs"));
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(errorFunction(true, "Something went wrong"));
    }
  };




module.exports = { createJob, listAllFilterJob, getJobById, getJobPostedByOwn };
