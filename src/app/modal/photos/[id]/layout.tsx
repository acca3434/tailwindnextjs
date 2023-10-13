import type { Metadata } from 'next'
import Layout from '@/components/github-corner/Photos'
export const metadata: Metadata = {
    title: 'test입니당',
    description: 'Tailwind 설정중',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    )
}
