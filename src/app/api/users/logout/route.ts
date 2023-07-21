import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // creating response
    const response = await NextResponse.json({
      msg: "Logout successful",
      success: true,
    });

    // emptying cookies
    response.cookies.set("token", "", { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      msg: "Failed to logout",
      success: false,
      error: error.message,
    });
  }
}
