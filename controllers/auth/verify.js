const { createError, sendMail } = require("../../helpers");
const { User, VerifyEmailSchema } = require("../../models/User");

const verify = async (req, res, next) => {
  const { error } = VerifyEmailSchema.validate(req.body);
  if (error) {
    throw createError(400, "Ошибка от Joi или другой библиотеки валидации");
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="localhost:3000/api/verify/${user.verificationToken}">Confirm</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verify;
