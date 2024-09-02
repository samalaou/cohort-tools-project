const User = require("../models/User.model");
const { NotFoundError } = require('../middleware/CustomError');

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await User.findById(userId);
    if (!result) {
      throw new NotFoundError("User not found");
    }
    const { _id, email, name } = result;
    res.json({ _id, email, name });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };