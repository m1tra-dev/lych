'use client'
import { motion, useAnimation, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { FC, useEffect, useRef, useState } from "react"
import { Wrap } from "./wrapper"

export const Gallery:FC = (item) => {
    const ref = useRef(null)
    const isInView = useInView(ref,{once:true,margin: "0px 0px -200px 0px"})
    const {scrollYProgress}=useScroll({target:ref})
    const x = useTransform(scrollYProgress, [0,1], ["0%","-85%"])
    const controls = useAnimation()
    useEffect(()=>{
        if (isInView){
            controls.start("animate")
        }
      },[isInView])
    return(
        <section  className="">
            <Wrap>
                <h2 className="text-secondary text-2xl text-center font-medium"> Наша галлерея</h2>    
            </Wrap> 
            <Wrap>
                <div ref={ref} className="  h-[300vh]">
                <motion.div  
                    initial={{
                        x:"100%"
                    }}
                    animate={{
                        x:"0%"
                    }}
                    transition={{delay:0.5,duration:1}}
                    className=" sticky top-0 flex h-screen items-center overflow-hidden" style={{x}}>
                    <div className="flex gap-20 " >
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </motion.div>     
                </div>
            </Wrap>
            
            
        </section>
    )
}                                 

const Card = () => {
    return(
        <div className="relative w-[50vw] h-[70vh] border-2 border-black rounded-md">
            <label className="absolute top-0 right-0 p-10 text-2xl">Picture1</label>
        </div>
    )    
}