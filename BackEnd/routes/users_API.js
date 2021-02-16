const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const { User, validate } = require("../models/user_model");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// for getting all the users
router.get("/", [auth, admin], async (req, res) => {
  const user = await User.find().select("-password").sort("name");
  res.send(user);
});

// For Getting Current LoggedIn User
router.get("/current", async (req, res) => {
  const token = req.header('Authorization')
  res.cookie('test', 'cookies_form_backend')
  res.send(jwt.decode(token))
});

// Registering/Creating a User
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User Already Registered");
  }

  // user = new User({
  //     name : req.body.name,
  //     email : req.body.email,
  //     password : req.body.password
  // });
  user = new User(
    _.pick(req.body, ["name", "email", "password"])
  ); /*Using lodash to simplify the object*/

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.genrateAuthToken();

  res
    .header("Authorization", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

module.exports = router;
