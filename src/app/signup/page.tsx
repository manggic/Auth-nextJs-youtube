"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import axios from "axios";
import { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      const { username, email, password } = user;
      const { data } = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });

      console.log("sign up response data", data);
      if (data.success) {
        router.push("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (error: any) {
      console.log("ERROR", error.message);
      toast.error(error.message);
    }
  };

  let fields = ["username", "email", "password"];

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen	">
      <Toaster />
      <h1 className="py-2">Sign Up</h1>

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
        onClick={() => onSignup()}
        className="text-white bg-slate-500 p-2 border rounded-md mt-4  mx-28"
      >
        Signup
      </button>

      <Link className="text-xs py-4 text-amber-300" href="/login">
        Login
      </Link>
    </div>
  );
}
