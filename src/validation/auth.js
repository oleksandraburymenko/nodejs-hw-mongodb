import Joi from "joi";

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});

export const userGoogleAuthCodeSchema = Joi.object({
    code: Joi.string().required(),
});