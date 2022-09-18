const { createError, sendMail } = require("../../helpers");
const { User, JoiSchema } = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = JoiSchema.validate(req.body);

  if (error) {
    throw createError(400, "Ошибка от Joi или другой библиотеки валидации");
  }
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const pass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  await User.create({ email, password: pass, avatarURL });
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="localhost:3000/api/verify/${verificationToken}">Confirm</a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    users: {
      email,
    },
  });
};

module.exports = register;
