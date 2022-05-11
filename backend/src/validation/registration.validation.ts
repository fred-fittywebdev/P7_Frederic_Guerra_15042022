import { Joi } from 'express-validation';

export const RegistrationValidation = Joi.object({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	username: Joi.string(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	password_confirm: Joi.string().required(),
	profil_picture: Joi.string(),
});
