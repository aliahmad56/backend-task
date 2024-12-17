const { MESSAGES } = require("../constants");
const { body } = require("express-validator");

const categoryDataValidate = [
  body("name")
    .exists()
    .withMessage(MESSAGES.CATEGORY_NAME_REQUIRED)
    .isString()
    .withMessage(MESSAGES.NAME_SHOULD_BE_STRING)
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(MESSAGES.ONLY_ALPHANUMERIC_VALUES_AND_SPACE_ALLOWED),
];

module.exports = {
  categoryDataValidate,
};
