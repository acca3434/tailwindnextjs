'use client'
import Button from '@/components/Buttons/Button'
import TextInput from '@/components/Input/TextInput'
import Divider from '@/components/Divider'
import tw from 'twin.macro'
import RadioGroup from '@/components/Radio'
import CheckBox from '@/components/Radio/CheckBox'

const Login: React.FC<LoginLayoutProps> = () => {
    return (
        <>
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
        </>
    )
}
export default Login
