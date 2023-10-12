'use client'
import React from 'react'
import tw from 'twin.macro'

const ButtonVariant = {
    primary: [
        tw`bg-gray-500 text-black`,
        tw`border-gray-600 border`,
        tw`hover:bg-gray-600 hover:text-sky-400`,
        tw`active:bg-black`,
        tw`disabled:bg-black`,
    ],
    outline: [
        tw`text-gray-500`,
        tw`border-gray-500 border`,
        tw`hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100`,
    ],
    ghost: [
        tw`text-black`,
        tw`shadow-none`,
        tw`hover:bg-black hover:text-sky-400 active:bg-black disabled:bg-black`,
        tw`active:bg-black`,
        tw`disabled:bg-black`,
    ],
    light: [
        tw`bg-white text-gray-700`,
        tw`border border-gray-300`,
        tw`hover:text-right hover:bg-gray-100`,
        tw`active:bg-white/80 disabled:bg-gray-200`,
    ],
    dark: [
        tw`bg-gray-900 text-white`,
        tw`border border-gray-600`,
        tw`hover:bg-sky-400 hover:text-black hover:border-sky-400 active:bg-gray-700 disabled:bg-gray-700`,
    ],
}

interface ButtonSizeProps {
    base: string[]
    sm: string[]
}

const ButtonSize = {
    base: tw`px-10 py-8 text-sm [font-size: large] w-100 h-50`,
    sm: tw`px-5 py-2.5 text-xs [font-size: small]  w-80 h-35`,
}
type ButtonProps = {
    isLoading?: boolean
    isDarkBg?: boolean
    disabled?: boolean
    variant?: keyof typeof ButtonVariant
    size?: keyof typeof ButtonSize
    title?: string
    width?: number
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'base', isDarkBg = true, title = '거래하기' }) => {
    return (
        <div tw="rounded-xl p-8">
            <div tw="flex">
                <span tw="relative inline-flex">
                    <button
                        type="button"
                        css={[
                            tw`
                                flex items-center justify-center rounded-md text-sm font-bold leading-6 text-sky-500 shadow ring-1 ring-slate-900/10 transition duration-150 ease-in-out
                            `,
                            ButtonSize[size],
                            ButtonVariant[variant],
                            `${isDarkBg && tw`hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800`}`,
                        ]}
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
