const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();


const createToken = async ({ email, id }) => {
    return await jwt.sign({ email, id }, process.env.JWT_TOKEN_SECRET);
  };

const userVerifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.email = decoded.email;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  createToken,
  userVerifyToken
};
