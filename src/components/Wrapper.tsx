'use client'
import tw from 'twin.macro'

const Wrapper: React.FC<BasicLayoutProps> = ({ title, children, close }) => {
    return (
        <div css={tw`flex flex-col items-center p-25`}>
            <div css={tw`rounded-lg bg-white shadow-lg`}>
                <div css={tw`p-18 [border-bottom: 1px solid rgb(221, 221, 221)]`}>
                    <div css={tw`flex items-center justify-between`}>
                        <p css={tw`text-xl  font-NanumGothic font-bold`}>{title}</p>
                        <div onClick={close}>X</div>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Wrapper
