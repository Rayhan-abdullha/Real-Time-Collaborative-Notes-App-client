/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//     children: ReactNode;
//     className?: string;
//     type?: string;
//     onClick?: () => void;
// }

const Button = ({ children, className, onClick, ...props }: any) => {
    return (
        <button
            onClick={onClick}
            {...props}
            className={`bg-base-200 text-white px-4 py-2.5 rounded-full font-medium hover:scale-105 transition-all duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
