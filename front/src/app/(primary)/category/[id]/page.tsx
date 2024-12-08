'use client'
import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { Context } from "@/app/layout";
import { Card } from '@/components/shared/menu/products/card';
import { searchContext } from '@/components/shared/menu/menuBar/menuNavBar';
import { IProducts } from '@/interface/IProducts';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

export default function MenuHome() {
  const [products, setProducts] = useState([]);
  const contextValue = useContext(searchContext)
  useEffect(() => {
    setProducts(contextValue);
  }, [contextValue]);
  console.log(contextValue)
  const {store} = useContext(Context)
  return(

    <div className='flex justify-center flex-wrap min-h-screen'>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`grid grid-cols-3 w-full gap-20 flex-wrap `}>
            {products.map((category:IProducts,index)=>(
              <motion.div               
              key={index} 
                className='relative'
              >
                <Card {...category}/>
                  {store.isAuth&&store.user.adm?(
                    <>
                      
                      {/* <DeleteButton index={category.id}/> */}
                    </>
                  ):(null)
                }
              </motion.div>
            ))} 
        </motion.div>
      </AnimatePresence>
    </div>
   
    )
  }
