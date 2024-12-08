'use client'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FC, useState } from "react";
import { motion } from "framer-motion";

export const SocialButton:FC = (item) => {
    const [isHovered, setIsHovered] = useState(false);
    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.5,
            staggerChildren: 0.01
          }
        }
      };
    
      const letterVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0
        }
      };
        
    return(
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-4"
            >
                <span className={`group-hover:text-black z-10 absolute transition duration-300 w-full h-0.5 bg-black top-0 left-0 transform origin-right group-hover:scale-x-0 group-hover:transition group-hover:duration-300 group-hover:origin-left`}></span>
                <span className={`group-hover:text-black z-10 absolute transition duration-300 w-0.5 h-full bg-black top-0 left-0 transform scale-0 origin-bottom group-hover:scale-100 group-hover:transition group-hover:duration-300 group-hover:origin-top`}></span>
                <span className={`group-hover:text-black z-10 absolute transition duration-300 w-full h-0.5 bg-black bottom-0 left-0 transform origin-left group-hover:scale-x-0 group-hover:transition group-hover:duration-300 group-hover:origin-right`}></span>
                <span className={`group-hover:text-black z-10 absolute transition duration-300 w-0.5 h-full bg-black top-0 right-0 transform scale-0 origin-top group-hover:scale-100 group-hover:transition group-hover:duration-300 group-hover:origin-bottom`}></span>
                <div className="flex">
                    <FontAwesomeIcon className={` z-10 w-12 h-12 text-center `}  icon={item.ico} />
                    <motion.div variants={textVariants} initial="hidden" animate={ isHovered ? "visible" : "hidden"} className="h-0 px-4">
                        {[...item.description].map((letter, index) => (
                          <motion.span key={index} variants={letterVariants} className="text-center text-black">{letter}</motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
    
    )
}