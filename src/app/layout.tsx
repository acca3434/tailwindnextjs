import './globals.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/app/lib/registry'
import GlobalStyles from '@/styles/GlobalStyles'
import Wrapper from '@/components/Cards/Wrapper'
export const metadata: Metadata = {
    title: '로그인',
    description: '로그인',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyles />
                    {children}
                    {/* {children} */}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
