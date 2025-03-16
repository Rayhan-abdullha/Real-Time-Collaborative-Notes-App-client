'use client';
import { Icons } from '@/components';
import ScrollToTop from 'react-scroll-to-top';

const ScrollTop = () => {
    return (
        <div className=''>
            <ScrollToTop
                smooth
                style={{
                    borderRadius: '99px',
                    backgroundColor: '#5f27cd'
                }}
                component={<Icons.MoveUp className='stroke-white' />}
                className='rounded-full flex items-center justify-center bg-[#5f27cd]'
            />
        </div>
    );
};

export default ScrollTop;
