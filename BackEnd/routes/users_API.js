const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const multer = require("multer");
const cors = require('cors');

const { User, validate } = require("../models/user_model");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

// for getting all the users
router.get("/", [auth, admin], async (req, res) => {
  const user = await User.find().select("-password").sort("name");
  res.send(user);
});

// For Getting Current LoggedIn User
router.get("/current", async (req, res) => {
  const token = req.header("Authorization");
  res.cookie("test", "cookies_form_backend");
  const decodedToken = jwt.decode(token);
  let user = await User.findById(decodedToken._id).select("-password");
  if (!user) {
    return res.status(400).send({ message: "user not found with provided ID" });
  }
  return res.status(200).send(user);
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

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.genrateAuthToken();

  res
    .header("Authorization", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

// update password, needs current password for user password change

router.post("/update-password", auth, async (req, res) => {
  const userID = req.user._id;
  // console.log(userID);

  // console.log(req.body);

  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userID);

  if (!user) {
    return res.status(400).send({ message: "user not found with provided ID" });
  }

  const validPass = await bcrypt.compare(oldPassword, user.password);
  if (!validPass) {
    return res
      .status(202)
      .send("Old password is incorrect. New password cannot be updated!");
  }

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();
  res.status(200).send({ message: "Password Updated Successfully" });
});

router.post("/updateUserInfo", auth, async (req, res) => {
  const userID = req.user._id;
  const { name, address, mobile, email } = req.body;

  let user = await User.findById(userID).select("-password");
  if (!user) {
    return res.status(400).send({ message: "user not found with provided ID" });
  }

  console.log(req.body);

  if (name && !address && !mobile && !email) {
    user.name = name;
    user = await user.save();
    return res.send(user);
  } else if (!name && address && !mobile && !email) {
    user.address = address;
    user = await user.save();
    return res.send(user);
  } else if (!name && !address && mobile && !email) {
    user.mobile = mobile;
    user = await user.save();
    return res.send(user);
  } else if (!name && !address && !mobile && email) {
    user.email = email;
    user = await user.save();
    return res.send(user);
  }
});

// router.post('/profilePic', cors(), function(req,res,next){
//   upload(req,res,function(err){
//       if(err){
//           return res.status(501).json({error:err});
//       }
//       //do all database record saving activity
//       return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
//   });
// });

module.exports = router;
