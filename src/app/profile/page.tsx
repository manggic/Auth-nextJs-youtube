"use client";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ProfilePage = () => {
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");

      toast.success("Logout successful");
    } catch (error: any) {
      console.log("Logout Failed", error.message);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <h1>Profile Page</h1>

      <button
        onClick={() => logout()}
        className="text-emerald-300 border-solid border-2 border-sky-500 px-2 py-1 mt-2 rounded"
      >
        logout
      </button>
    </div>
  );
};

export default ProfilePage;
