'use client'
import Link,{LinkProps} from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

interface TransitionLinkProps extends LinkProps {
    children:ReactNode,
    href:string
}

function sleep(ms:number): Promise<void> {
    return new Promise((resolve)=>setTimeout(resolve,ms))
}

export const TransitionLink = ({
    children,
    href,
    ...props
}:TransitionLinkProps) => {
  const router=useRouter()
  const handleTransition = async (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const body=document.querySelector("body")

    body?.classList.add("page-transition")
    body?.classList.add("page-transition-block")
    await sleep(500)
    router.push(href)
    await sleep(500)
    body?.classList.remove("page-transition")
    body?.classList.remove("page-transition-block")
  }

  return (
    <Link 
        onClick={handleTransition}
        href={href} 
        {...props}
    >
        {children}
    </Link>
  )
}