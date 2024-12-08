'use client'
import { IProducts } from "@/interface/IProducts"
import CounterStore from "@/store/counter-store"
import { height } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft"
import { delay, motion, Reorder, useMotionValue, useTransform } from "framer-motion"
import { Minus, Plus, Trash2, X } from "lucide-react"
import { observer } from "mobx-react-lite"

import { FC, useEffect, useState } from "react"


interface ICard{
    onRemove:(id:number)=>void
    product: IProducts
    counterStore:CounterStore
}

const variants = {
    initial:{
        opacity:0,
        height:0,
    },
    animate:{
        opacity:1,
        height:'auto',
    },
    exit:{
        opacity:0,
        height:0,
    }
  }

export const Item:FC <ICard> = observer(({onRemove,product,counterStore}) => {
    const {count,increment,decrement} = counterStore   
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setHasAnimated(true);
        }, 300); 

        return () => clearTimeout(timer);
      }, []);
    return (
        <motion.div
            transition={{
                delay: hasAnimated ? 0 : 0.3,
                duration:0.3}}
            {...variants}>
            <Reorder.Item 
                dragMomentum={false}
                dragElastic={0.5}
                value={product}
             
            >
                <div className="p-5 bg-white flex h-40  gap-5  items-center border-b-2 border-gray-200 relative">
                    <button className="absolute top-0 right-0 m-5 " onClick={(()=>onRemove(product.id))}><X/></button>
                    <img src={product.image} className="w-32 h-32 border-2 border-gray-300 rounded-lg object-center object-cover" alt="" />
                    <div className='flex text-xl justify-start  flex-grow h-full  flex-col  '>

                        <span className="text-xl flex-1 self-start">{product.name}</span>
                        <span className="text-sm self-start mt-6 text-gray-400">Количество:</span>
                        <div className="flex gap-1 flex-1 justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="w-3 text-base font-semibold mr-1">{count}</span>
                                <div className="flex gap-1">
                                    <button  onClick={()=>increment(1)}>
                                        <Plus  className="text-secondary rounded-md w-5 h-5"/>
                                    </button>
                                    <button onClick={()=>decrement(1)}>
                                        <Minus className="text-secondary rounded-md  w-5 h-5"/>
                                </button>
                                </div>
                            </div>
                            <div>{`${count*Number(product.price)}₽`}</div>
                        </div>
                    </div>

                </div> 
            </Reorder.Item>  
      </motion.div>  
    )
})

