"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      let { email, password } = user || {};
      if (!email || !password) {
        toast.error("pls enter details");
      } else {
        const { data } = await axios.post("/api/users/login", {
          email,
          password,
        });

        if (data.success) {
          router.push("/profile");
          // toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error: any) {
      console.log("LOGIN ERROR", error.message);
    }
  };

  let fields = ["email", "password"];
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen	">
      <Toaster />
      <h1 className="py-2">Log In</h1>

      <div className="">
        {fields.map((ele, index) => {
          return (
            <div className="" key={index}>
              <label
                style={
                  ele === "email"
                    ? { display: "inline-block", width: "73px" }
                    : {}
                }
                htmlFor="username"
              >
                {ele}
              </label>
              <input
                type={ele}
                name={ele}
                id={ele}
                onChange={(e) => setUser({ ...user, [ele]: e.target.value })}
                placeholder={ele}
                value={user[ele]}
                className="p-2 ml-2 text-black my-2 w-80"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => onLogin()}
        className="text-white bg-slate-500 p-2 border rounded-md mt-4  mx-28"
      >
        Login
      </button>

      <Link className="text-xs py-4 text-amber-300" href="/signup">
        Sign up
      </Link>
    </div>
  );
}
