const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { CustomError, NotFoundError } = require('../middleware/CustomError');

const saltRounds = 10;

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new CustomError("Provide email, password, and name", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new CustomError("Provide a valid email address", 400);
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      throw new CustomError("Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.", 400);
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      throw new CustomError("User already exists", 400);
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({ email, password: hashedPassword, name });
    const { _id } = createdUser;

    res.status(201).json({ user: { email, name, _id } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("Provide email and password", 400);
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, name } = foundUser;
      const payload = { _id, email, name };
      console.log(111111111111, process.env.TOKEN_SECRET)

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    } else {
      throw new CustomError("Unable to authenticate the user", 401);
    }
  } catch (error) {
    next(error);
  }
};

const verify = (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  verify,
};
