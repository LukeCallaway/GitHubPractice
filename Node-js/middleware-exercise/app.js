const express = require("express");
const ExpressError = require("./express-error");
// const middleware = require("./middleware")
const morgan = require("morgan")

const shoppingRoutes = require("./shopping-routes")

const app = express();

app.use(express.json());

app.use(morgan('dev'))

app.use(shoppingRoutes)

// 404 handler
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;