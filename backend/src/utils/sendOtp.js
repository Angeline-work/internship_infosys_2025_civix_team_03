const nodemailer = require("nodemailer");

async function sendOtp(email, otp) {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Civix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Civix OTP Verification",
    text: `Your OTP is ${otp}`,
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`
  });
}

module.exports = sendOtp;
