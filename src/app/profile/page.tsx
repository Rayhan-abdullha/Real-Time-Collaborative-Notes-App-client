'use client'
import api from "../../utils/api";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get("/auth/profile"); // Endpoint to get the user's profile
        return response.data.data;
      } catch (err) {
        console.error("Error fetching user data", err);
        return null;
      }
    } 

    fetchUserData().then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg ring-1 ring-gray-200">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Profile</h1>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Welcome, {user?.name}</p>
          <p className="text-lg text-gray-500 mt-2">Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
