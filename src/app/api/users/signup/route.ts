import User from "@/models/UserModel";

import { connect } from "@/db/config";

import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
connect();

export async function POST(request: Request) {
  try {
    // accepting data from req body
    const res = await request.json();

    const { username, email, password } = res;

    // validating data coming from front-end
    if (!username || !email || !password) {
      return NextResponse.json({
        msg: "Pls Provide all details",
        success: false,
      });
    }

    // checking if user is already registered
    const user = await User.findOne({ email });

    // throw msg stating user already present
    if (user) {
      return NextResponse.json({ msg: "user already present", success: false });
    }

    // hashing password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // creating user based on data provided
    const creatingUser = new User({ username, email, password: hashedPass });

    // saving data in DB
    const savedUser = await creatingUser.save();

    // returning response
    return NextResponse.json({
      success: true,
      msg: "successfully added to DB",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
