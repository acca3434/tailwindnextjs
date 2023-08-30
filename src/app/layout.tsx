'use Client'
import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Layout from '@/layouts/context/card'
import StyledComponentsRegistry from '@/app/lib/registry'
interface RootLayOutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    title: 'TailWind 설정',
    description: 'Tailwind 설정하자',
}

const RootLayout: React.FC<RootLayOutProps> = ({ children }) => {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <Layout>{children}</Layout>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}

export default RootLayout
