'use client'
import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'

const Label: React.FC<LabelProps> = ({ labelContent, checked, onChange }) => {
    return (
        <>
            <label
                css={[
                    tw`relative h-8 w-8 border border-gray-400 rounded-full flex items-center justify-center transition-transform duration-1000 ease-in-out cursor-pointer`,
                    checked && tw`transform scale-125`,
                ]}
            >
                <input
                    type="radio"
                    css={[tw`opacity-0 absolute h-8 w-8 cursor-pointer`]}
                    checked={checked}
                    onChange={onChange}
                />
                <span
                    css={[
                        tw`w-4 h-4 rounded-full bg-indigo-600 inline-block transition-transform duration-1000 ease-in-out`,
                        checked && tw`transform scale-150`,
                    ]}
                />
                <span css={tw`hidden`}>{labelContent}</span>
            </label>
        </>
    )
}

export default Label

// 'use client'
// import React, { useState, useEffect } from 'react'
// import tw from 'twin.macro'

// const Label: React.FC<LabelProps> = ({ labelContent, type, userType, defaultChecked }) => {
//     const [isChecked, setIsChecked] = useState(defaultChecked)

//     useEffect(() => {
//         setIsChecked(defaultChecked)
//     }, [defaultChecked])

//     const handleInputChange = () => {
//         setIsChecked(!isChecked)
//     }

//     return (
//         <>
//             <div css={tw`ml-15 flex items-center space-x-4`}>
//                 <input
//                     type={type}
//                     css={tw`focus:ring-indigo-500 h-20 w-20 text-indigo-600 transition-transform duration-1000`}
//                     className={isChecked ? 'transform scale-110' : 'transform scale-100'}
//                     name={userType}
//                     defaultChecked={defaultChecked}
//                 />
//                 <label htmlFor={labelContent} css={tw`text-sm text-gray-700`}>
//                     {labelContent}
//                 </label>
//             </div>
//         </>
//     )
// }

// export default Label
