'use client'

import tw, { css } from 'twin.macro'
import React from 'react'
interface TestProps {
    width?: number
    height?: number
}
const Test: React.FC<TestProps> = ({ width, height }) => {
    return (
        <>
            <p
                css={[
                    tw`w-full h-full `,
                    {
                        width: width,
                        height: height,
                    },
                ]}
            >
                안녕하세요
            </p>
            <p css={[tw`md:text-52 md:p-0 mt-4 pl-7 pr-7 font-NanumSquare text-center md:text-left md:leading-[3rem]`]}>
                <span
                    css={[
                        tw`font-bold`,
                        {
                            fontSize: width,
                        },
                    ]}
                >
                    새로운 세상
                </span>
                <span css={[tw`opacity-80`]}>을 위한</span>
                <br />
                <span css={[tw`font-bold`]}>앞서가는 개발자</span>
                <span css={[tw`opacity-80`]}>취업 프로젝트</span>
            </p>
            <p css={[tw`md:text-[20px] md:text-left text-xl text-center font-NanumGothic font-tiny`]}>
                이륙할 준비가 되셨나요?
            </p>
            <div className="p-4 md:p-0">
                <p className="md:text-[20px] md:text-left text-xl text-center font-NanumGothic font-tiny">
                    이륙할 준비가 되셨나요?
                </p>
                <p className="md:text-[20px] md:text-left text-xl text-center font-NanumGothic font-tiny">
                    이륙할 준비가 되셨나요?
                </p>
                <p className="md:text-52 md:p-0 mt-4 pl-7 pr-7 font-NanumSquare text-center md:text-left md:leading-[3rem]">
                    <span className="font-bold">새로운 세상</span>
                    <span className="opacity-80">을 위한</span>
                    <br />
                    <span className="font-bold">앞서가는 개발자</span>
                    <span className="opacity-80">취업 프로젝트</span>
                </p>
            </div>
        </>
    )
}

export default Test
