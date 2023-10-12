'use client'
import tw from 'twin.macro'
const LoginHeader: React.FC = () => {
    return (
        <>
            <div css={tw`[background-color: rgb(85, 105, 255)]`}>
                <div css={tw`p-6 border-b-2 [background-color: rgb(85, 105, 255)] shadow-md`}>
                    <div css={tw`container mx-auto`}>
                        <div css={tw`p-0 flex justify-center items-center`}>
                            <img css={tw`m-2`} src="https://www.kiweb.or.kr/assets/front/img/block_logo.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div css={tw`[background-color: #F9FAFC]`}>
                <div css={tw`p-6 border-b-2 border-gray-300 [background-color: #F9FAFC] shadow-md `}>
                    <div css={tw`container mx-auto`}>
                        <div css={tw`p-0 flex justify-center items-center`}>
                            <h3 css={tw`text-2xl font-NanumGothic font-bold m-20`}>로그인 이후 이용해주세요</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginHeader
