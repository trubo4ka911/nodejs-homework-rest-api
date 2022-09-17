const { createError } = require("../../helpers");
const { User } = require("../../models/User");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyToken;
