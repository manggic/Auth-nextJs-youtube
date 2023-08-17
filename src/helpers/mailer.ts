import nodemailer from "nodemailer";

import User from "@/models/UserModel";

import bcryptjs from "bcryptjs";
import { connect } from "@/db/config";
const {
  MAILTRAP_USERNAME,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_HOST,
  DOMAIN,
  USER_EMAIL,
  USER_PASS,
  PORT,
  HOST
} = process.env || {};

connect();
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(email, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        { email },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }

    var transport = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: true,
      auth: {
        user: USER_EMAIL,
        pass: USER_PASS,
      },
    });

    const mailOptions = {
      from: "manish@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "",
      html: `<p>click<a href="${DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "forgotpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your password" : "reset your password"
      }</p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return {success:true, msg:'successfully sent email', data:mailRes}
    return mailRes;
  } catch (error: any) {
    console.log("sendEmail ERROR", error.message);

    return { success: false, msg: error.message };
  }
};
