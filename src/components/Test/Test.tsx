'use client'

import tw, { css } from "twin.macro";
import React from "react"
interface TestProps {
  width? : number
  height?: number
} 
const Test: React.FC<TestProps> = ({ width, height, }) => {
    return (
      <>
        <div
          css={[
            tw`w-full h-full`,
            {
              width: width,
              height: height,
            },
          ]}
        >
          안녕하세요
        </div>
      </>
    )
}

export default Test