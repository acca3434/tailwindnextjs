'use client'
import tw from 'twin.macro'

const TextInput: React.FC<TextInputProps> = ({ labelContent, type }) => {
    return (
        <div css={[tw`relative`]}>
            <input
                css={[
                    tw`m-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
                    {
                        width: '500px',
                        height: '53px',
                    },
                ]}
                type={type}
            />
            <label css={[tw`absolute top-2 left-15 bg-white px-1 text-xs text-gray-500`]} htmlFor="textfield">
                {labelContent}
            </label>
        </div>
    )
}

export default TextInput
