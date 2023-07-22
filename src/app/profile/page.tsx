"use client";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const [userId, setUserId] = useState("");

  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed", error.message);
      toast.error("Logout Failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const user = await axios.get("/api/users/user");

      setUserId(user.data.data._id);
    } catch (error: any) {
      console.log("ERROR", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <h1 className="mb-20 text-2xl">Profile Page</h1>

      <h2 className="text-orange-500">
        {userId ? <Link href={`/profile/${userId}`}>go to profile</Link> : ""}
      </h2>
      <button
        onClick={() => logout()}
        className="absolute top-0 right-10 text-emerald-300 border-solid border-2 border-sky-500 px-2 py-1 mt-2 rounded"
      >
        logout
      </button>

      {!userId ? (
        <button
          className="text-pink-400 border-solid border-2 border-sky-500 px-2 py-1 mt-2 rounded"
          onClick={getUserDetails}
        >
          getuser Details
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
