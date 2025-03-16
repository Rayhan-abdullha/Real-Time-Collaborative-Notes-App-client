"use client";
import { useState } from "react";
import api from "../../../utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { AuthErrorType } from "@/lib/ErrorType";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { dispatch } = useAuthContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data.data;
      Cookies.set("accessToken", accessToken, { secure: true, sameSite: 'Strict' });
      toast.success("Login successful");
      dispatch({ 
        type: 'SET_AUTH',
        payload: {
          email,
          id: response.data.data._id
        }
      });
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } else {
        setError((err as AuthErrorType).response?.data?.details[0].message || "Something went wrong");
        toast.error((err as AuthErrorType).response?.data?.details[0].message || "Something went wrong");
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#5f27cd] text-white rounded-md hover:bg-[#4e18ba] focus:outline-none"
          >
            Login
          </button>
        </form>
        <Link href="/auth/signup" className="text-[#5f27cd] mt-4 block text-center hover:underline">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
