import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/users/testing?token=$2a$10$ycbV0o09Qg0wX/FeJhhYmeAdWVpTdttN4kmd/ptwSKw8D5nI1KFVK&pass=12345

export async function GET(request: NextRequest) {
  // const searchParams = useSearchParams() // we can use only in Client

  let queryObj: any = {};

  let str = request.nextUrl.search;

  str
    .slice(1, str.length)
    .split("&")
    .map((item) => (queryObj[item.split("=")[0]] = item.split("=")[1]));

  const isPassMatch = await bcryptjs.compare(queryObj.pass, queryObj.token);

  return NextResponse.json({
    success: true,
    msg: isPassMatch ? "Same Password" : "Diff password",
    data: queryObj,
  });
}
