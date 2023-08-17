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

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

    if (regex.test(email)) {
      return true;
    }
    return false;
  };

  const onLogin = async () => {
    try {
      let { email, password } = user || {};

      if (!validateEmail(email)) {
        toast.error("pls provide correct email");
        return
      }
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
      <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
        {/* {fields.map((ele, index) => {
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
        })} */}
      </div>
      <button
        onClick={() => onLogin()}
        className="text-white bg-slate-500 p-2 border rounded-md mt-4  mx-28"
      >
        Login
      </button>

      <Link
        className="py-2"
        href={{
          pathname: "/forgotpasswordemail",
          query: { email: user.email },
        }}
      >
        forgot password
      </Link>

      <Link className="text-xs py-4 text-amber-300" href="/signup">
        Sign up
      </Link>
    </div>
  );
}
