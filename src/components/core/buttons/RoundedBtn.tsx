import Link from 'next/link';
import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    href: string;
    target?: string;
}

const RoundedBtn: FC<IProps> = ({ children, className, href, target }) => {
    return (
        <Link
            href={href}
            target={target}
            className={`bg-base-200 text-white px-4 py-2.5 rounded-full font-medium hover:scale-105 transition-all duration-300 ${className}`}
        >
            {children}
        </Link>
    );
};

export default RoundedBtn;
