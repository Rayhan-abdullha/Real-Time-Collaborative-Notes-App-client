import { MENUS } from '@/static'
import Link from 'next/link'
import React from 'react'
import { Home, NotebookIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const DesktopMenu = () => {
    const pathName = usePathname();
  return (
      <>
        {MENUS.map(({ id, route, label }) => (
            <Link
                key={id} 
                href={route} 
                title={label}
                className={`hover:text-[#5f27cd] transition-all duration-300 px-3 py-2 ${pathName === route ? 'font-medium text-[#5f27cd]' : ''}`}
            >
                {label === 'Home' && <Home className='w-8 h-8' />}
                {label === 'Notes' && <NotebookIcon className='w-8 h-8' />}
            </Link>
        ))}
    </>
  )
}

export default DesktopMenu