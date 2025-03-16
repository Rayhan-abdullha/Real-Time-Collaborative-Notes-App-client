'use client';
import Logo from '@/components/Logo'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DesktopMenu from './DesktopMenu';
import Profile from './Profile';
import MobileMenu from './MobileMenu';
import { Menu } from 'lucide-react';

const TheHeader = () => {
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isShowMobileMenu);
    }, [isShowMobileMenu]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsShowMobileMenu(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMobileMenu = () => setIsShowMobileMenu(false);

    return (
        <header className='sticky top-0 py-4 z-50 bg-main-500 sm:shadow-sm mb-3 xl:mb-6'>
            <div className='container flex justify-between sm:justify-center items-center px-4'>
                <Link href={'/'} className='flex gap-2 items-center block sm:hidden'>
                    <Logo />
                </Link>
                <nav className='hidden sm:flex items-center gap-6 text-gray-900 '>
                    <DesktopMenu/>
                   <Profile/>
                </nav>
                <div className='sm:hidden flex items-center gap-4'>
                    <button onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}>
                        <Menu className='w-8 h-8 text-gray-700 shadow-sm'/>
                    </button>
                </div>
            </div>
            <div 
                className={`fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ${isShowMobileMenu ? 'block' : 'hidden'}`} 
                onClick={closeMobileMenu}
            />
            <MobileMenu isShowMobileMenu={isShowMobileMenu} closeMobileMenu={closeMobileMenu}/>
        </header>
    );
};

export default TheHeader;
