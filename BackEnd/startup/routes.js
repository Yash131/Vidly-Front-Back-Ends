const bodyParser = require("body-parser");
const morgan = require("morgan");

const genres = require("../routes/genres_API");
const customers = require("../routes/customers_API");
const movies = require("../routes/movies_API");
const rentals = require("../routes/rentals_API");
const users = require("../routes/users_API");
const auth = require("../routes/auth(login)_API");
const contactUs = require("../routes/contactUs_API");
const schoppingCarts = require("../routes/shoppingCarts_API");
const userCart = require("../routes/user-cart_API");


const error = require("../middlewares/error");
const winston = require("winston");
const cookieParser = require('cookie-parser');

module.exports = function (app) {
  // Only Runs in Development Model *use SET from CMD to change Development to Production*
  if (app.get("env") === "development") {
    winston.info("Morgan is running...");
    app.use(morgan("short"));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require("cors")());
  app.use(cookieParser())
  app.use(require('prerender-node').set('prerenderToken', 'QqEtl0dUGE9Sjnu5GzKb'));

  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/contactUs", contactUs);
  app.use("/api/carts", schoppingCarts);
  app.use("/api/userCart", userCart);

  app.use(error); /*Always put in the end of middleware list*/
};
