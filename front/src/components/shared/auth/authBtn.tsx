import { Button } from '@/components/ui'
import { LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { Log } from './log'
import { motion } from 'framer-motion'

type Props = {}

export const AuthBtn = (props: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <>
        <button onClick={toggleMenu} className="px-4 py-2  h-full bg-gradient-to-b from-[#E5CB54] via-[#F8CB50] to-[#FBEB9A] bg-[#E5CB54]  text-gray-950 font-medium rounded-md whitespace-nowrap">
            Войти
        </button>   
        {isMenuOpen&&
            <>
                <div 
                    className='flex flex-col h-full w-full justify-center items-center   fixed top-0 right-0'>   
                    <Log onClose={()=>setIsMenuOpen(!isMenuOpen)}/> 
                </div>
            </>
        }
        
        </>
  )
}