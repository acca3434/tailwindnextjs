'use client'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto border border-gray-700">{children}</div>
        </div>
    )
}

export default Layout
