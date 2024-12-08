import { motion, transform } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';



interface IBg {
    children: React.ReactNode,
  }

const AnimatedGrid:FC<IBg> = ({children}) => {
    const canvasRef = useRef(null);

    
    return  <>
    {/* <motion.div  ref={canvasRef} className='-left-20 -right-20 -top-20 -bottom-20 fixed  grid grid-cols-16 grid-rows-8 gap-0'  >
      {Array.from({ length: 128 }).map((_, index) => (
             <div
               key={index}
               className={`h-full border-dashed border-[0.5px] border-gray-300`}
             />
           ))}
    </motion.div>   */}
    <div className=''>{children}</div></>;;
};



export default AnimatedGrid;
    