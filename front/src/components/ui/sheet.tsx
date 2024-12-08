import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react"

interface props{
  children:React.ReactNode;
  onClick: () => void;
}

export const Sheet:FC<props> = ({children,onClick}) => {
  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  },[])
  return (
    <div onClick={(e) => e.stopPropagation()} >
      <motion.div
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        exit={{opacity:0}} 
        transition={{duration:0.3}}
        onClick={onClick} className="fixed w-full h-full bg-black/50 z-50 top-0 right-0"/>
      <motion.div 
        initial={{width:0}} 
        animate={{width:"21%"}} 
        exit={{width:0}} 
        transition={{duration:0.3}}
        className="fixed h-full overflow-scroll  bg-white z-50 top-0 right-0 ">
          {children}
        </motion.div>
    </div>
  )
}