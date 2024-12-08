import { easeIn, motion, useAnimation, useInView } from "framer-motion"
import { FC, useEffect, useRef } from "react"

interface IWrapper{
    children: React.ReactNode,
    width?:"fit-content" | "100%",
}

export const Wrap:FC<IWrapper> = ({children,width="fit-content"}) => {
    const ref = useRef(null)
    const isInView = useInView(ref,{once:true,margin: "0px 0px -100px 0px"})
    const controls = useAnimation()
    const slide = useAnimation()
    useEffect(()=>{
      if (isInView){
        controls.start("visible")
        slide.start("visible")
      }
    },[isInView])
    return(
        <div ref={ref} className="relative" style={{width}}>
            <motion.div
              className='absolute top-1 bottom-1 left-0 right-0 bg-violet-300  '
              variants={{
                hidden:{left:0},
                visible:{left:"100%"},
              }}
              initial="hidden"
              animate={slide}
              transition={{duration:0.5,ease:"easeIn"}
              
            }
            >
            
            </motion.div>
            <motion.div

              variants={{
                hidden:{opacity:0,y:75},
                visible:{opacity:1,y:0}
              }} 
              initial="hidden"
              animate={controls}
              transition={{duration:0.5, delay:0.5}}
              className=""
               >
              {children}
            </motion.div>

    </div>
    )
}