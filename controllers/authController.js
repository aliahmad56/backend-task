var userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
const generator = require("generate-password");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../utils/helpers/sendEmail");
const { createToken } = require("../middlewares/authorization");
const responseHandler  = require("../utils/helpers/responseHandler");
const { MESSAGES, WELCOME_EMAIL } = require("../utils/constants");


const login = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseHandler(res, 400, {
          success: false,
          errors: errors.array(),
        });
      }
  
      const { email, password } = req?.body;
      const user = await userModel.findOne({ email });
      
      if (user && bcrypt.compareSync(password, user?.password)) {
        // Generate the access token
        const accessToken = await createToken(user);
  
        return responseHandler(res, 200, {
          access_token: accessToken,
        });
      } else {
        // Respond with incorrect email or password message
        return responseHandler(res, 401, {
          message: MESSAGES.INCORRECT_EMAIL_OR_PASSWORD,
        });
      }
    } catch (err) {
      // Handle internal server error
      return responseHandler(res, 500, { 
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        error: err, 
      });

    }
  };
  
const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHandler(res, 400, {
        success: false,
        errors: errors.array(),
      });
    }

  const { email } = req?.body;
  const userInfo = await userModel.findOne({email: email})
  if(userInfo){
    return responseHandler(res, 400, { message: MESSAGES.USER_ALREADY_EXIST });
  }

    // Generate a random password
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const newUser = new userModel({ email, password });
    await newUser.save();
    const bodyDetail = `${process.env.FRONT_END}/login ${password}`;

    // Send the welcome email
    await sendEmail(
      email,
      WELCOME_EMAIL.SUBJECT,
      bodyDetail
    );

    return responseHandler(res, 200, { message: MESSAGES.EMAIL_SENT });
  } catch (err) {
    return responseHandler(res, 500, {
      message: MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};


module.exports = {
login,
signup
};
