'use client'
import api from "../../utils/api";
import { useEffect, useState } from "react";

export interface IAuthor {
  name: string;
  email: string;
}
const Profile = () => {
  const [user, setUser] = useState<IAuthor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);  // Start loading when fetching data
      try {
        const response = await api.get("/auth/profile");
        const data = response.data.data;
        setUser(data);  // Set user data
        setLoading(false);  // Stop loading
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("Failed to load user data. Please try again later.");
        setLoading(false);  // Stop loading
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#5f27cd]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 flex justify-center items-center  min-h-[80vh]">
    <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg ring-1 ring-gray-200">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 uppercase bg-[#5f27cd] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
          {user?.name?.[0]}
        </div>
        <h1 className="text-xl font-semibold first-letter:uppercase text-[#5f27cd] mt-4">{user?.name}</h1>
      </div>
      <div className="mt-4 text-center space-y-2">
        <p className="text-gray-700 text-lg font-medium">Welcome, <span className="first-letter:uppercase text-[#5f27cd]">{user?.name}</span></p>
        <p className="text-gray-500 text-sm">Email: {user?.email}</p>
      </div>
    </div>
  </div>
  
  );
};

export default Profile;
