import Test from '@/components/Test/Test'
import Button from '@/components/buttons/Button'
import IconButton from '@/components/buttons/IconButton'
import { Laptop } from 'lucide-react'

export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
            <Button disabled={true} title={'거래하기'} variant="primary" />
            <Button disabled={true} title={'과정목록'} variant="ghost" />
            <Button disabled={true} title={'학생목록'} variant="dark" />
            <IconButton variant="outline" icon={Laptop} />
            <Test width={100} height={100}></Test>
            <div className="flex h-full w-full items-center justify-center">
                <div className="m-20 h-full w-full border-black bg-sky-100 p-20">
                    <div className="flex items-center justify-between">
                        <p className="font-NanumGothic font-bold">과정 목록</p>
                        <div className="">X</div>
                    </div>
                    <div>바디</div>
                </div>
            </div>
        </>
    )
}
