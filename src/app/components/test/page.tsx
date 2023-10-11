import React from 'react'
import Button from '@/components/buttons/Button'
import IconButton from '@/components/buttons/IconButton'
import Test from '@/components/Test/Test'
export default function Page() {
    return (
        <>
            <Button disabled={true} title={'거래하기'} variant="ghost" />
            <Button disabled={true} title={'과정목록'} variant="light" size="base" />
            <Button disabled={true} title={'학생목록'} />
            <IconButton />
            <Test width={300} height={300} />
        </>
    )
}
