import User from "@/models/UserModel";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();

    const { token, password } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
    //   forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

  
    if (!user) {
      return NextResponse.json({ success: false, msg: "User Doesn't exist" });
    }

    // hashing password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user.password = hashedPass;
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save();

    return NextResponse.json({ success: true, msg: "testing", data: reqBody });
  } catch (error) {
    console.log("ERROR", error);
  }
}
