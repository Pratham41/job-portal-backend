const joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const registerValidation = joi.object({
     name: joi.string().min(3).max(25).trim(true).required(),
     email: joi.string().email().trim(true).required(),
     password: joi.string().min(8).trim(true).required(),
});

const loginValidation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().trim(true).required(),
});

const userValidation = async (req, res, next) => {
	const payload = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	const { error } = registerValidation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};

const userLoginValidation = async (req, res, next) => {
	const payload = {
		email: req.body.email,
		password: req.body.password,
	};

	const { error } = loginValidation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};

module.exports = {userValidation, userLoginValidation};