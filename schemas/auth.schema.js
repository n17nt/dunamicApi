import Joi from "joi";

let registerAuthSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeatPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .valid(Joi.in("password")),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uz", "ru"] },
    })
    .required(),
});
let loginAuthSchema = Joi.object({
  login: Joi.string().alphanum().min(6).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

let resetSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .valid(Joi.in("newPassword")),
});
let forgetSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uz", "ru"] },
    })
    .required(),
});
let otpSchema = Joi.object({
  otpCode: Joi.number()
    .min(100000)
    .max(1000000 - 1)
    .required(),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .valid(Joi.in("newPassword")),
});

export {
  registerAuthSchema,
  loginAuthSchema,
  resetSchema,
  forgetSchema,
  otpSchema,
};
