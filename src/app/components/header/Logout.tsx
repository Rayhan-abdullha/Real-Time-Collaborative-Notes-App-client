'use client'
import { useAuthContext } from '@/context/AuthContext';
import { CustomErrorType } from '@/lib/ErrorType';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
const Logout = () => {
    const router = useRouter();
    const { dispatch} = useAuthContext();
    const handleLogout = async () => {
        try {
          await api.post('/auth/logout');
          toast.success('Logout successful');
          dispatch({ type: 'LOGOUT' });
          router.push('/auth/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message || "Something went wrong");
            } else {
                toast.error((err as CustomErrorType).response?.data?.message || "Something went wrong");
            }
        }
    }
  return (
      <button onClick={handleLogout} className='bg-[#5f27cd] py-1 px-4 text-white rounded-full font-medium hover:scale-105 transition-all duration-300'>
        Logout
    </button>
  )
}

export default Logout