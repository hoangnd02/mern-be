const User = require("../models/user");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hashSync(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      useName: shortid.generate(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: { error },
        });
      }
      if (data) {
        res.status(201).json({ user: data });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({
        message: "Have something wrong",
      });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });
        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Sign out successfully",
  });
};
