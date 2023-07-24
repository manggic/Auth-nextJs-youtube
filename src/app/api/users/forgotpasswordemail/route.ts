import { connect } from "@/db/config";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {
  const reqBody = await request.json();

  const user = await User.findOne({ email: reqBody.email });

  if (!user) {
    return NextResponse.json({ success: false, msg: "user does not exist" });
  }
  if (!user.isVerified) {
    return NextResponse.json({
      success: false,
      msg: "user email is not verified",
    });
  }

  const res = await sendEmail({
    email: reqBody.email,
    emailType: "RESET",
    userId: user._id,
  });

  console.log('res ?????',res);
  

  if (res.success) {
    return NextResponse.json({ success: true, msg: res, data: reqBody });
  } else {
    return NextResponse.json({ success: false, msg: res.msg, data: reqBody });
  }
}
