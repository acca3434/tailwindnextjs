'use client'
import Button from '@/components/buttons/Button'
import TextInput from '@/components/input/TextInput'
import Divider from '@/components/dIvider'
import tw from 'twin.macro'
import RadioGroup from '@/components/radio'
import CheckBox from '@/components/radio/CheckBox'

const LoginHeader: React.FC = () => {
    return (
        <>
            <div tw="[background-color: rgb(85, 105, 255)]">
                <div tw="p-6 border-b-2 [background-color: rgb(85, 105, 255)] shadow-md">
                    <div tw="container mx-auto">
                        <div tw="p-0 flex justify-center items-center">
                            <img
                                tw="m-20"
                                src="https://www.kiweb.or.kr/assets/front/img/block_logo.png"
                                width="242px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div tw="[background-color: #F9FAFC]">
                <div tw="p-6 border-b-2 border-gray-300 [background-color: #F9FAFC] shadow-md ">
                    <div tw="container mx-auto">
                        <div tw="p-0 flex justify-center items-center">
                            <h3 tw="text-2xl font-NanumGothic font-bold m-20">로그인 이후 이용해주세요</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Wrapper: React.FC<BasicLayoutProps> = ({ title, children, close }) => {
    return (
        <div tw="flex mt-20 items-center justify-center">
            <div tw="rounded-lg bg-white shadow-lg">
                {title && (
                    <div tw="p-18 [border-bottom: 1px solid rgb(221, 221, 221)]">
                        <div tw="items-center flex justify-start">
                            <p tw="text-xl  font-NanumGothic font-bold">{title}</p>
                            {close && <div>X</div>}
                        </div>
                    </div>
                )}
                <div>{children}</div>
            </div>
        </div>
    )
}

const Login: React.FC<LoginLayoutProps> = () => {
    return (
        <>
            <LoginHeader />
            <Wrapper>
                <div css={tw`flex flex-col items-center p-25`}>
                    <div css={tw`flex flex-col mb-4`}>
                        <TextInput labelContent="아이디" type="text" />
                        <TextInput labelContent="패스워드" type="password" />
                    </div>
                    <div css={tw`flex items-center justify-between w-full`}>
                        <div css={tw`flex items-center`}>
                            <CheckBox />
                        </div>
                        <div css={tw`flex flex-row`}>
                            <div className="flex items-center justify-center">
                                <RadioGroup value={'admin'} label={'운영자'} />
                                <RadioGroup value={'teacher'} label={'교강사'} />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div css={tw`flex items-center justify-center m-10`}>
                    <Button size="base" variant="primary" title="로그인" disabled={true} />
                </div>
            </Wrapper>
        </>
    )
}

export default function Home() {
    return <Login />
}
