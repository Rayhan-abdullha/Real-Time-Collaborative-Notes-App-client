'use client'
import { useAuthContext } from '@/context/AuthContext';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import React from 'react'
const Logout = () => {
    const router = useRouter();
    const { dispatch} = useAuthContext();
    const handleLogout = async () => {
        await api.post('/auth/logout');
        dispatch({ type: 'LOGOUT' });
        router.push('/auth/login');
    }
  return (
      <button onClick={handleLogout} className='bg-[#5f27cd] py-1 px-4 text-white rounded-full font-medium hover:scale-105 transition-all duration-300'>
        Logout
    </button>
  )
}

export default Logout