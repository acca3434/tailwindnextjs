const Wrapper: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                    <div className="m-20 h-full w-full border-black bg-sky-100 p-20">
                        <div className="flex items-between justify-between">
                            <p className="font-NanumGothic font-bold">과정 목록</p>
                            <div className="">X</div>
                        </div>
                    </div>
                </h2>
                <div>{children}</div>
            </div>
        </>
    )
}

export default Wrapper
