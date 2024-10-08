const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

function signUpValidation(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).email().required(),
    password: passwordComplexity().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),

    role: Joi.string().valid("employer", "seeker").required(),
  });
  return schema.validate(obj);
}
function signInValidation(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  signUpValidation,
  signInValidation,
};
