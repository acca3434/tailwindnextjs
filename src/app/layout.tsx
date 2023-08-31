import './globals.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/app/lib/registry'
import GlobalStyles from '@/styles/GlobalStyles'

export const metadata: Metadata = {
    title: 'TailWind 설정',
    description: 'Tailwind 설정하자',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    {/* <Layout>{children}</Layout> */}
                    <GlobalStyles />
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
