"use client";

import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

    if (regex.test(email)) {
      return true;
    }
    return false;
  };
  const handleSubmit = async () => {
    try {
      if (email) {
        if (!validateEmail(email)) {
          toast.error("pls provide correct email");
          return;
        }
        const res = await axios.post("/api/users/forgotpasswordemail", {
          email,
        });

        if (res.data.success) {
          toast.success("Check your email");
        } else {
          toast.error(res.data.msg, { duration: 2000 });
        }
      } else {
        toast.error("pls provide email");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-center mt-20">
      <Toaster />
      <h4>Enter your email</h4>
      <div className="flex justify-center mt-4">
        <input
          className="text-black pl-1 w-3/12"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="email"
        />

        <button
          className="ml-4 border p-2 rounded bg-neutral-400 text-black"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordEmail;
