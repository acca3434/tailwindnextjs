import React from "react";
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
export default function Page() {
  return (
    <>
      <Button disabled={true} title={"거래하기"} /> 
      <Button disabled={true} title={"과정목록"} /> 
      <Button disabled={true} title={"학생목록"} /> 
      <IconButton/>
    </>
  )
}