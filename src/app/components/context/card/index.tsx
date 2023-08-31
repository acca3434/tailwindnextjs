const Wrapper: React.FC<BasicLayoutProps> = ({ title, children, close }) => {
    return (
        <div tw="flex mt-20 items-center justify-center">
            <div tw="rounded-lg bg-white shadow-lg">
                {title && (
                    <div tw="p-18 [border-bottom: 1px solid rgb(221, 221, 221)]">
                        <div tw="items-center flex justify-start">
                            <p tw="text-xl  font-NanumGothic font-bold">{title}</p>
                            {close && <div>X</div>}
                        </div>
                    </div>
                )}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Wrapper
