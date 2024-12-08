'use client'
import { FC, useContext, useState } from "react"
import { Context } from "@/app/layout"
import { UserRound } from "lucide-react"


export const LogOut:FC = () => {
    const data = useContext(Context)    
    return <button onClick={()=>data.store.logout()}>LogOut</button>
}



export const List:FC  = ({user}) => {
    
    const entries = Object.entries(user);
    entries.push(['button',<LogOut/>])
    return (
        <>
            <ul className="absolute bg-white">
                {entries.map(([key, value]) => (
                    <li key={key}>{value}</li>
                ) )}
            </ul>
            
        </>
    )
}

export const User:FC = ({opacity}) => {
    const [state,setState]=useState(false)
    const data = useContext(Context)    
    return (
        <div className=" flex flex-col  max-h-12 " onMouseEnter={()=>setState(true)} onMouseLeave={()=>setState(false)}>
            <UserRound className="self-center"/>
            <div>{state&&<List user={data.store.user}/>}</div>        
        </div>
    )
}
