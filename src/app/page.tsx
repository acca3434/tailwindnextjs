import Button from "@/components/buttons/Button"
import IconButton from "@/components/buttons/IconButton"
import {
  Laptop,
} from 'lucide-react';
export default function Home() {
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <Button disabled={true} title={"거래하기"} variant="primary" /> 
      <Button disabled={true} title={"과정목록"} variant="ghost"/> 
      <Button disabled={true} title={"학생목록"} variant="dark"/> 
      <IconButton variant='outline' icon={Laptop} />
    </>
  );
}
