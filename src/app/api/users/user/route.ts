import { connect } from "@/db/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const userData = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      success: true,
      msg: "Request successful",
      data: userData,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      msg: "Can't fulfill your request",
    });
  }
}
