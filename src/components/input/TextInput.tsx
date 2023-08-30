'use client'
import tw from 'twin.macro'

const TextInput = () => {
    return (
        <div css={[tw`relative`]}>
            <input
                css={[
                    tw`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
                ]}
                type="text"
            />
            <label css={[tw`absolute top-2 left-4 bg-white px-1 text-xs text-gray-500`]} htmlFor="textfield">
                Enter text
            </label>
        </div>
    )
}

export default TextInput
