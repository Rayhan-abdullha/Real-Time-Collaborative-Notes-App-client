'use client';
import React, { useState } from 'react';
import { AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Icons } from '../Icons';

interface IProps {
    title: string;
    content: string;
}
const FaqItem = ({ title, content }: IProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AccordionTrigger onClick={() => setOpen(!open)}>
                <div className='flex items-center justify-between w-full'>
                    <h3>{title}</h3>
                    {!open ? <ArrowPlus /> : <ArrowMinus />}
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <p>{content}</p>
            </AccordionContent>
        </>
    );
};

export default FaqItem;

const ArrowPlus = () => {
    return (
        <div className='bg-base-200 w-9 h-9 rounded-[8px] flex items-center justify-center'>
            <span className='bg-white p-0.5 rounded-[8px] w-6 h-6 flex items-center justify-center'>
                <Icons.Plus className='fill-base-200 stroke-base-200' />
            </span>
        </div>
    );
};
const ArrowMinus = () => {
    return (
        <div className='bg-base-200 w-9 h-9 rounded-[8px] flex items-center justify-center'>
            <span className='bg-white p-0.5 rounded-[8px] w-6 h-6 flex items-center justify-center'>
                <Icons.Minus className='fill-base-200 stroke-base-200' />
            </span>
        </div>
    );
};
