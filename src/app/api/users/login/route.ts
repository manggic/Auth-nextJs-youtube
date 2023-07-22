import User from "@/models/UserModel";

import { connect } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
connect();

export async function POST(request: Request) {
  try {
    // accepting body from req body
    const { email, password } = await request.json();

    // validating data coming from front-end
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        msg: "Pls provide complete details",
      });
    }

    // fetching user from DB
    const user = await User.findOne({ email });

    // throw msg if user doesn't exist in our DB
    if (!user) {
      return NextResponse.json({ success: false, msg: "user doesn't exist" });
    }

    // validate user provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // throw msg if password doesn't match
    if (!isPasswordValid) {
      return NextResponse.json({
        msg: "Your password is incorrect",
        success: false,
      });
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      password: user.password,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    // creating response
    const response = NextResponse.json({ success: true, msg: "Login success" });

    // setting cookies in response
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log("LOGIN ERROR", error.message);
  }
}
