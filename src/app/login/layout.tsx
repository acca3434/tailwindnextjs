import '@/app/globals.css'
import LoginHeader from '@/components/LoginHeader'
import Wrapper from '@/components/Wrapper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'test입니당',
    description: 'Tailwind 설정중',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <LoginHeader />
                <Wrapper title={'정보를 입력하세요'}>{children}</Wrapper>
            </body>
        </html>
    )
}
