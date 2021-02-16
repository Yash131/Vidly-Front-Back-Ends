const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.genrateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("Users", userSchema);

const validate = (user) => {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().trim().required(),
    isAdmin: Joi.boolean().default(false),
  };

  return Joi.validate(user, schema);
};

exports.validate = validate;
exports.User = User;
