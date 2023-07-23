import { connect } from "@/db/config";

import User from "@/models/UserModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Response) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ success: false, msg: "user not found" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      msg: "Email verified successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, msg: error.message });
  }
}
