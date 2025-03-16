/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

interface IProps {
    children: any;
    href: string;
    className?: string;
    target?: string;
}
const NextLink = ({ children, href, className, target }: IProps) => {
    return (
        <Link
            className={`text-base-500 ml-1 ${className}`}
            href={href}
            target={target ? target : '_blank'}
        >
            {children}
        </Link>
    );
};

export default NextLink;
