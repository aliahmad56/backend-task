const { MESSAGES } = require("../constants");
const { body } = require("express-validator");

const carDataValidate = [
  body("model")
    .exists()
    .withMessage(MESSAGES.CAR_MODEL_IS_REQUIRED)
    .isString()
    .withMessage(MESSAGES.SHOULD_BE_STRING)
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED),
  body("color")
    .exists()
    .withMessage(MESSAGES.CAR_COLOR_IS_REQUIRED)
    .isString()
    .withMessage(MESSAGES.SHOULD_BE_STRING)
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED),
  body("registration_no")
    .exists()
    .withMessage(MESSAGES.CAR_REG_NO_IS_REQUIRED)
    .isString()
    .withMessage(MESSAGES.SHOULD_BE_STRING)
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED),
  body("category_id").exists().withMessage(MESSAGES.CATEGORY_ID_IS_REQUIRED),
];

module.exports = {
  carDataValidate,
};
