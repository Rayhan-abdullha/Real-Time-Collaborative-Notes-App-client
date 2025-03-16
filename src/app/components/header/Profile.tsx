'use client'
import { useAuthContext } from '@/context/AuthContext'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Logout from './Logout';
const Profile = ({isMobile}: {isMobile?: boolean}) => {
    const { state } = useAuthContext();
  return (
    <>
        {
            !state.isAuthenticated ?  <Link
                href={'/auth/login'}
                title='Login'
            className={`bg-[#5f27cd] py-1 px-4 text-white rounded-full font-medium hover:scale-105 transition-all duration-300`}
            >
                Login
            </Link> :
            <div className={`${isMobile ? 'flex gap-4 flex-col justify-start w-[90px]' : 'flex gap-8 items-center'}`}>
                <Link href={'/profile'} title='Profile'> 
                    <Image
                        src="https://th.bing.com/th/id/OIP.wEsBe2udHBieFeZVmus8qAHaHk?rs=1&pid=ImgDetMain"
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full w-9 h-9 object-cover shadow-md cursor-pointer hover:scale-105 transition-all duration-300"
                    />
                </Link>
                <Logout/>
            </div>
            
        }
        
    </>
  )
}

export default Profile