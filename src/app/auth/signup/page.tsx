"use client";
import { useState } from "react";
import api from "../../../utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CustomErrorType } from "@/lib/ErrorType";
import toast from "react-hot-toast";

const Signup = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = state;
    try {
      setLoading(true);
      const response = await api.post("/auth/register", { email, password, name } , { withCredentials: true });
      toast.success("Signup successful");
      router.push("/");
      Cookies.set("accessToken", response.data.data.accessToken);
    } catch (err: unknown) {
      setError((err as CustomErrorType).response?.data?.message || "Something went wrong");
      toast.error((err as CustomErrorType).response?.data.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
            />
            <input
              type="password"
              placeholder="Password"
              name="password" 
              value={state.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
            />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-[10px] mt-4 bg-[#5f27cd] text-white rounded-md cursor-pointer hover:bg-[#4e18ba] focus:outline-none"
          >
            {loading ? <LoadingSpinner className="text-white w-5 h-5" /> : "Sign Up"}
          </button>
        </form>
        <Link href="/auth/login" className="text-[#5f27cd] mt-4 block text-center hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
