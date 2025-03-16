'use client';
import React from 'react'
import { MENUS } from '@/static';
import { Icons } from '@/components';
import { Home, NotebookIcon } from 'lucide-react';
import Link from 'next/link';
import Profile from './Profile';

type PropsType = { isShowMobileMenu: boolean, closeMobileMenu: () => void };
const MobileMenu = ({ isShowMobileMenu, closeMobileMenu } : PropsType) => {
  return (
    <div 
        className={`fixed inset-y-0 left-0 bg-white text-gray-900  pt-20 pl-5 shadow-lg rounded-lg w-2/3 sm:w-1/2 transition-transform duration-300 ${isShowMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <button className='absolute top-4 right-4 hover:transform hover:scale-110 transition-all' onClick={closeMobileMenu}>
            <Icons.X className='text-gray-600 ' />
        </button>
        {MENUS.map(({ id, route, label }) => (
            <Link key={id} href={route} className='text-base font-medium py-2 hover:text-[#5f27cd] mb-3 block hover:transform hover:scale-105 transition-all' onClick={closeMobileMenu}>
                    {label === 'Home' && <div className='flex gap-2 items-center'><Home className='w-6 h-6' />{label}</div>}
                    {label === 'Notes' && <div className='flex gap-2 items-center'><NotebookIcon className='w-7 h-7' />{label}</div>}
            </Link>
        ))}
          <Profile isMobile={true}/>
    </div>
  )
}

export default MobileMenu