import nodemailer from "nodemailer";

import User from "@/models/UserModel";

import bcryptjs from "bcryptjs";
const {
  MAILTRAP_USERNAME,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_HOST,
  DOMAIN,
} = process.env || {};

export const sendEmail = async ( {email, emailType, userId}:any) => {
  try {
    const hashedToken = await bcryptjs.hash(email, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: MAILTRAP_HOST,
      port: MAILTRAP_PORT,
      auth: {
        user: MAILTRAP_USERNAME,
        pass: MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "manish@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "",
      html: `<p>click<a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your password" : "reset your password"
      }</p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);

    return mailRes;
  } catch (error: any) {
    console.log("ERROR", error.message);

    throw new Error(error.message);
  }
};
