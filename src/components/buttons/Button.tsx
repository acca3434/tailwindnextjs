'use client'
import React from 'react'
import { cn } from '@/app/lib/utils'
import tw from 'twin.macro'

const ButtonVariant = {
    primary: [
        'bg-primary-500 text-black',
        'border-primary-600 border',
        'hover:bg-primary-600 hover:text-sky-400',
        'active:bg-primary-700',
        'disabled:bg-primary-700',
    ],
    outline: [
        'text-primary-500',
        'border-primary-500 border',
        'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
    ],
    ghost: [
        'text-black',
        'shadow-none',
        'hover:bg-primary-600 hover:text-sky-400 active:bg-primary-100 disabled:bg-primary-100',
    ],
    light: [
        'bg-white text-gray-700',
        'border border-gray-300',
        'hover:text-dark hover:bg-gray-100',
        'active:bg-white/80 disabled:bg-gray-200',
    ],
    dark: [
        'bg-gray-900 text-white',
        'border border-gray-600',
        'hover:bg-sky-400 hover:text-black hover:border-sky-400 active:bg-gray-700 disabled:bg-gray-700',
    ],
}

const ButtonSize = {
    base: ['px-10 py-8', 'text-sm md:text-base', 'w-100 h-50'],
    sm: ['px-5 py-2.5', 'text-xs md:text-sm', 'w-80 h-35'],
}

type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    disabled?: boolean
    variant?: keyof typeof ButtonVariant
    size?: keyof typeof ButtonSize
    title?: string
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'base',
    isDarkBg = false,
    title = '거래하기',
}) => {
    return (
        <div className="rounded-xl p-8">
            <div className="flex">
                <span className="relative inline-flex">
                    <button
                        type="button"
                        className={cn(
                            'flex items-center justify-center rounded-md text-sm font-semibold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out',
                            ButtonSize[size],
                            ...ButtonVariant[variant], // Use spread operator to include the classes
                            isDarkBg && ['hover:bg-gray-900', 'active:bg-gray-800', 'disabled:bg-gray-800'], // Add isDarkBg classes here
                        )}
                        // disabled={disabled}
                    >
                        <h2 css={tw`[font-size: medium] text-center font-NanumGothic font-bold`}>{title}</h2>
                    </button>
                    <span tw="absolute right-[-5%] top-[-10%] -mr-1 -mt-1 flex h-15 w-15">
                        <span tw="absolute inline-flex h-full w-full animate-bounce rounded-full bg-sky-400"></span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Button
