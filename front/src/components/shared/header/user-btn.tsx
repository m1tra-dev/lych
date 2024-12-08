import { Button } from "@/components/ui"
import { Users } from "lucide-react"
import Link from "next/link"

type Props = {}

export const UserBtn = (props: Props) => {
    return (
        <>
            <Link href={'/k-client'}>
                <Button onClick={()=>null}> 
                  <Users size={28} strokeWidth={1.5} />
                  <span  className='text-sm'></span>
                </Button>
              </Link>
        </>
  )
}