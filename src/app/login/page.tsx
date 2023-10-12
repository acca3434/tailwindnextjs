import React from 'react'
import Button from '@/components/Buttons/Button'
import IconButton from '@/components/Buttons/IconButton'
import Test from '@/components/Test/Test'
import Wrapper from '@/components/Cards/Wrapper'

export default function Page() {
    return (
        <Wrapper title={'버튼 모음'}>
            <Button disabled={true} title={'거래하기'} variant="ghost" />
            <Button disabled={true} title={'과정목록'} variant="light" size="base" />
            <Button disabled={true} title={'학생목록'} />
            <IconButton />
            <Test width={300} height={300} />
        </Wrapper>
    )
}
