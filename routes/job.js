const router = require("express").Router();
const {  createJob, listAllFilterJob, getJobById, getJobPostedByOwn } = require("../controller/job");
// MIDDLEWARES
const { protect } = require("../middleware/auth");
const { createJobValidation } = require("../middleware/job.validator")

router.route("/").post(protect,listAllFilterJob);
router.route("/postedByYou").post(protect,getJobPostedByOwn);
router.route("/:id").get(protect,getJobById);
router.route("/create").post(protect,createJobValidation,createJob);


module.exports = router;
