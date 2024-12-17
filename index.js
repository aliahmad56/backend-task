const createError = require('http-errors');
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = 5000;
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');
const connectDB = require('./config/dbConfig'); // MongoDB connection setup
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Connect to MongoDB
connectDB(); // Ensure this happens before any route handling

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/car", carRoutes);
app.use("/category", categoryRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
