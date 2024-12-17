const express = require('express');
const router = express.Router();

const authController  = require("../controllers/authController");
const { login, signup } = authController;
const {
    loginDataValidate,
    signupDataValidate,
  } = require("../utils/validations/authValidation");

router.post("/login", loginDataValidate, login);
router.post("/signup", signupDataValidate, signup);

module.exports = router;
