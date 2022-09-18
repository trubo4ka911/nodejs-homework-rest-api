const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "trubo4ka911@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

const mail = {
  to: "wepaho9411@iunicus.com",
  from: "trubo4ka911@gmail.com",
  subject: "New mail",
  html: "<h2>New order</h2>",
};
sgMail
  .send(mail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
module.exports = sendMail;
