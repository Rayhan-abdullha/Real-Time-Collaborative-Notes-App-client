import Image from 'next/image';
import React, { FC } from 'react';

interface IProps {
    className?: string;
    alt?: string;
    src: string;
}

const Avatar: FC<IProps> = ({ className, src, alt }) => {
    return (
        <Image
            src={src || '/logo_white.png'}
            width={132}
            height={100}
            alt={alt ? alt : 'Avatar'}
            className={`${className} h-full w-auto object-fill`}
            unoptimized
        />
    );
};
export default Avatar;
