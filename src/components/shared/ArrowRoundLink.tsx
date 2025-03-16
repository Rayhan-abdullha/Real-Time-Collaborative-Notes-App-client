import React from 'react';
import { Icons } from '../Icons';
import Link from 'next/link';

interface IProps {
    className?: string;
    href: string;
}

const ArrowRoundLink = ({ href, className }: IProps) => {
    return (
        <div className='absolute -bottom-1 -right-1'>
            <Link
                className={`bg-white w-[52px] h-[52px] rounded-full font-medium transition-all duration-300  border-8 border-main-500 dark:border-gray-900 flex items-center justify-center hover:bg-base-500  relative ${className}`}
                href={href}
            >
                <Icons.ArrowLink className='fill-base-500 hover:fill-white' />
            </Link>
            <div className='absolute right-[9px] -top-1'></div>
        </div>
    );
};

export default ArrowRoundLink;
