"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function VerifyEmail() {
  const [token, setToken] = useState();

  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
      });

      if (response?.data?.success) {
        setIsVerified(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error: any) {
      setError(true);
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const urlToken: any = window.location.search.split("=")[1];

    setToken(urlToken);
    return () => {};
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <Toaster />
      <h1 className="text-2xl">Verify Email</h1>

      <h2 className="bg-purple-500 text-yellow-100 mt-2">
        {token ? token : "no token"}
      </h2>

      {isVerified ? (
        <>
          <h2 className="text-green-400 text-xl pt-4">Email verified</h2>
          <Link className="text-center underline" href={"/login"}>login</Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default VerifyEmail;
