import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'test입니당',
    description: 'Tailwind 설정중',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}
