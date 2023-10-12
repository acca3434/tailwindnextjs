import Login from '@/components/Cards/Login'
import LoginHeader from '@/components/Cards/LoginHeader'
import Wrapper from '@/components/Cards/Wrapper'

export default function Home() {
    return (
        <>
            <LoginHeader />
            <Wrapper title={'정보를 입력하세요'}>
                <Login />
            </Wrapper>
        </>
    )
}
