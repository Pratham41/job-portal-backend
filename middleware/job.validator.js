const joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const createValidation = joi.object({
     title: joi.string().trim(true).required(),
     description: joi.string().trim(true).required(),
     email: joi.string().email().trim(true).required(),
     required_skills: joi.string().trim(true),
     experience_level: joi.string().trim(true),
});


const createJobValidation = async (req, res, next) => {
	const payload = {
        title: req.body.title,
        description: req.body.description,
        email: req.body.email,
        required_skills: req.body.required_skills,
        experience_level: req.body.experience_level
	};

	const { error } = createValidation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in Job Data : ${error.message}`)
		);
	} else {
		next();
	}
};




module.exports = {createJobValidation};