import React from 'react';
import Avatar from './Avatar';
import { Icons } from '../Icons';

interface IProps {
    src: string;
    tag?: string;
    view?: number;
}

const BlogThumb = ({ src, tag, view }: IProps) => {
    return (
        <div className='relative'>
            <Avatar
                src={src || '/logo_white.png'}
                className='w-full h-auto rounded-[8px]'
            />

            {tag ? (
                <div className='absolute left-5 top-5 transparentBlack text-white py-1.5 px-3 md:px-6 rounded-xl text-xs md:text-sm'>
                    {tag}
                </div>
            ) : (
                ''
            )}
            {view ? (
                <div className='absolute right-5 top-5 transparentBlack text-white py-1.5 px-3 rounded-xl text-xs md:text-sm flex gap-1 items-center justify-center'>
                    <Icons.Eye /> {view}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default BlogThumb;
