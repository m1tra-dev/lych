'use client'
import React from "react"
import { FC } from "react"
import { CardValue } from "./card-value"
import {  Card, MCard } from "./card"
import { motion } from "framer-motion"
import { Wrap } from "../wrapper"

export const CardSection:FC = () =>{
    // const textAnimation = {
    //     hidden: {
    //         y:20,
    //         opacity: 0,
    //     },
    //     visible: (custom:number) => ({
    //         y:0,
    //         opacity:100,
    //         transition:{delay:custom*0.2,duration:0.3},
    //     })
    // }
    // const letterVariants = {
    //     hidden: { opacity: 0, x: -20 },
    //     visible: {
    //       opacity: 1,
    //       x: 0
    //     }
    //   };
    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{amount:0.2}}
            className=' h-[calc(100vh-80px)] '
        >   
            <Wrap>
                <h1  className="text-black text-5xl font-bold text-center pt-10 ">Преимущества работать с нами</h1>
            </Wrap>
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{amount:0.2}}
                className='mx-auto grid max-w-2xl grid-cols-2 gap-7 m-10 ' 
                >
                
                {CardValue.map((value,index)=>(
                    
                    <motion.div  key={index} custom={index+2}  className={`${index<2?"mr-10":"ml-10"}`}>
                        <Wrap>
                            <Card
                                
                                {...value}

                            />  
                        </Wrap>
                    </motion.div>
                    
                ))}
            </motion.div>
            
        </motion.section>
    )
}