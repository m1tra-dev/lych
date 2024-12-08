'use client'

import React, { ForwardedRef, useState } from "react"
import { FC } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import {forwardRef} from "react"
import { motion } from "framer-motion"


export interface ICardValue{
    faIco:any,
    title:string,
    subtitle:string,
    description:string,
}
export const Card: FC<ICardValue>= (value) => {
    const [info,setInfo]=useState(false)
    return(
        // onMouseEnter={()=>setInfo(true)} onMouseLeave={()=>setInfo(false)}
        
        <div   className={`${info?"h-auto ":"h-52 "} z-0 group ease-in-out transition duration-300 shadow-primary shadow-lg w-52 p-4 flex flex-col justify-between items-start relative`}>
            <div className="z-0 absolute top-0 w-0 h-full bg-black left-0 group-hover:w-full transition-all duration-300"></div>
            <FontAwesomeIcon className={`${info?"hidden":" transition duration-300 h-5 w-5 z-10 group-hover:text-white hover:text-secondary"}`} icon={value.faIco} />
            <div className="z-10">
                <FontAwesomeIcon onClick={()=>setInfo(false)} className={`${info?"cursor-pointer h-5 w-5 z-10 transition duration-300 group-hover:text-white hover:text-secondary":"hidden"}`} icon={faArrowLeft} />
                <h1 className={`${info?"hidden":"text-black text-start group-hover:text-white transition duration-300"}`}>{value.title}</h1>
                <p className={`${info?"hidden":"text-gray text-sm pb-1.5"}`}>{value.subtitle}</p>
                <p className={`${info?"text-gray text-sm pb-1.5":"hidden"}`}>{value.description}</p>
            </div>
            <button onClick={()=>setInfo(true)} className={`${info?"hidden":"bg-black group-hover:bg-white group-hover:text-black rounded-md px-2 py-1 z-10 text-white hover:bg-secondary transition duration-300"}
            `}>Подробнее</button>
        </div>
    )

}
