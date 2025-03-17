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
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl ring-1 ring-gray-200 space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            {user?.name?.[0]}
          </div>
        </div>

        <h1 className="text-4xl font-semibold text-center text-indigo-600">Profile</h1>
        
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Welcome, {user?.name}</p>
          <p className="text-lg text-gray-500 mt-2">Email: {user?.email}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
