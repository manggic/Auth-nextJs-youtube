"use client";

import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        const response = await axios.post("/api/users/forgotpassword", {
          token: window.location.search.split("=")[1],
          password,
        });

        if (response.data.success) {
          toast.success("Password updated");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Both password does not match");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster />
      <input
        className="text-black p-2 w-3/12"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="text-black w-3/12 mt-10 p-2"
        type="password"
        name="confirmpassword"
        id="confirmpassword"
        placeholder="confirmpassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-2 border rounded bg-lime-400 p-2 text-black"
      >
        submit
      </button>
    </div>
  );
}

export default ForgotPassword;
