import { Button, Modal } from "@/components/ui";
import { IProducts } from "@/interface/IProducts";
import { RussianRuble, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { BasketBtn as cart } from "../../header/basket-btn";
import { motion } from "framer-motion";
import { ADelButton, AEditButton } from "../admin-tools/tools";
import { Context } from "@/app/layout";


export const Card: FC<IProducts> = (category) => {
    const pathname=usePathname().split('/')
    const [modal,setModal]=useState(0)
    const [result,setResult]=useState(null)
    const [state,setState]=useState()
    const {store} = useContext(Context)
    const handleAddToBasket = (id:number,quantity:number) => {
        const basketDataString = localStorage.getItem('BasketData');
        const basketData = basketDataString ? JSON.parse(basketDataString) : [];
        const exists = basketData.some((basketItem: number[]) => basketItem[0] === id);
      
        if (!exists){
          basketData.push([id,quantity]);
        }
        localStorage.setItem('BasketData', JSON.stringify(basketData));
      };
    
    return(
//href={`/product/${category.id}`}
      <motion.div 
        whileHover={{
              translateX: -8,
              translateY: -8,
              transition: { duration: 0.3 },
      }}
      className={`relative  bg-black  rounded-xl flex flex-col justify-center  aspect-[1/1.2]  w-full   hover:shadow-gray-400`}>     
        <motion.div 
            whileHover={{
                translateX: -8,
                translateY: -8,
                transition: { duration: 0.3 },
              }}
              className={`relative border-2 bg-white  border-black rounded-xl overflow-hidden  flex flex-col justify-center  aspect-[1/1.2]  w-full  h-full  hover:shadow-gray-400`}
            >   
              <div  className='flex flex-col items-center  rounded-xl h-full'>
                 <img
                   src={category.image}
                   
                   className="w-full aspect-square "
                 />
                <div className="flex w-full h-full  justify-between items-center px-2 gap-5 py-2">
                  <div className="bg-secondary w-1/4 h-12 absolute top-0 left-0 justify-center flex items-center p-1.5 rounded-br-lg">
                    <h1 className="text-white text-xl break-words">
                      {`${category.price}₽`}
                    </h1>
                  </div>
                  {store.isAuth&&store.user.adm?(
                    <div className='flex absolute items-center w-1/4 h-12 top-0 right-0 p-1.5  bg-secondary rounded-bl-lg'>
                      <ADelButton id={category.id} color={"text-white"}/>
                      <AEditButton id={category.id} color={"text-white"}/>
                    </div>
                    ):
                      (null)
                  }
                  <h1 className="text-2xl  font-bold  py-2 px-1.5   break-words">{category.name}</h1>
                  <Button style={"z-20 "} disabled={true} onClick={()=>null}>
                     <span className="text-xl font">Выбрать</span>
                  </Button>  
                </div>
              </div> 
       </motion.div >
      </motion.div >

    )
}