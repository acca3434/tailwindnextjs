import Test from '@/components/Test/Test'
import Button from '@/components/buttons/Button'
import TextInput from '@/components/input/TextInput'
export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
            <Button disabled={true} title={'거래하기'} variant="primary" />
            <Button disabled={true} title={'과정목록'} variant="ghost" />
            <Button disabled={true} title={'학생목록'} variant="dark" />
            <TextInput />
            <Test width={100} height={100}></Test>
        </>
    )
}
