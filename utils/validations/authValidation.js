const { MESSAGES } = require("../constants");
const { body } = require("express-validator");

const loginDataValidate = [
  body("email")
    .exists()
    .withMessage(MESSAGES.EMAIL_REQUIRED)
    .isString()
    .withMessage(MESSAGES.EMAIL_SHOULD_BE_STRING)
    .isEmail(),
  body("password")
    .exists()
    .withMessage(MESSAGES.PASSWORD_REQUIRED)
    .isString()
    .withMessage(MESSAGES.PASSWORD_SHOULD_BE_STRING),
];

const signupDataValidate = [
  body("email")
    .exists()
    .withMessage(MESSAGES.EMAIL_REQUIRED)
    .isString()
    .withMessage(MESSAGES.EMAIL_SHOULD_BE_STRING)
    .isEmail(),
];

module.exports = {
  loginDataValidate,
  signupDataValidate,
};
