/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface IProps {
    form: any;
    name: string;
    placeholder?: any;
    label?: string;
    labelClass?: string;
    formItemClassName?: string;
    className?: string;
    defaultValue?: string;
    type?: any | 'text';
    value?: string;
    disabled?: boolean;
}

const FormInput: FC<IProps> = ({
    form,
    name,
    placeholder,
    label,
    formItemClassName,
    labelClass,
    className,
    defaultValue,
    type,
    value,
    disabled
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', formItemClassName)}>
                    <FormLabel
                        className={cn(labelClass, 'font-normal text-sm')}
                    >
                        {label ? label : ''}
                    </FormLabel>
                    {type === 'textarea' ? (
                        <FormControl>
                            <div className='relative'>
                                <Textarea
                                    {...field}
                                    value={
                                        value ??
                                        field.value ??
                                        defaultValue ??
                                        ''
                                    }
                                    placeholder={placeholder}
                                    className={`placeholder-third-800 bg-first-300 focus-visible:ring-transparent text-white border border-white rounded-[8px] py-4 ${className}`}
                                    disabled={disabled}
                                />
                            </div>
                        </FormControl>
                    ) : (
                        <FormControl>
                            <div className='relative'>
                                <Input
                                    {...field}
                                    type={type}
                                    value={
                                        value ??
                                        field.value ??
                                        defaultValue ??
                                        ''
                                    }
                                    placeholder={placeholder}
                                    className={`placeholder-third-800 bg-first-300 focus-visible:ring-transparent text-white border border-white rounded-[8px] py-4 ${className}`}
                                    disabled={disabled}
                                />
                            </div>
                        </FormControl>
                    )}

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;
