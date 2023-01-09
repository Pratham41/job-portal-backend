const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const Jobs = require("../model/job");
const errorFunction = require("../utils/errorFunction");
const marked = require("marked");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Pdf only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/:id",
  upload.single("resume"),
  async (req, res) => {
    const { email, name } = req.body;

    const jobDetails = await Jobs.findById(req.params.id);

    let beforeMarkCoverLetter = `# ${name}\n\nSample cover letter for job application for **${jobDetails.title}**.`;
    let afterMarkCoverLetter = marked.parse(beforeMarkCoverLetter);

    const filter = { _id: req.params.id };
    const jobData = {
      email,
      name,
      cover_letter: afterMarkCoverLetter,
      resume: `/${req.file.path}`,
    };
    const update = {
      $push: { applied_by: jobData },
    };

    const jobs = await Jobs.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });

    if (jobs) {
      return res.status(201).json(errorFunction(false, "Applied Successfully"));
    } else {
      return res.status(400).json(errorFunction(true, "Error Applying Job"));
    }
  }
);

module.exports = router;
