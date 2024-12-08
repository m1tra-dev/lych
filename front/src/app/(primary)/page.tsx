'use client'
import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { Context } from "@/app/layout";
import { AButton, ADelButton, AEditButton } from '@/components/shared/menu/admin-tools/tools';
import { Card } from '@/components/shared/menu/products/card';
import { searchContext } from '@/components/shared/menu/menuBar/menuNavBar';
import { IProducts } from '@/interface/IProducts';
import {  motion } from 'framer-motion';

export default function MenuHome() {
  const [products, setProducts] = useState([]);
  const [del, setDel] = useState();
  const pathname=usePathname()
  const contextValue = useContext(searchContext)
  useEffect(() => {
    setProducts(contextValue);
  }, [contextValue]);

  const {store} = useContext(Context)
  return(

    <div className='flex justify-center flex-wrap min-h-screen'>
      <div className={`grid grid-cols-3 gap-20 relative w-full`}>
          {products.map((category:IProducts,index)=>(
            <motion.div 
              key={index} 
              className='relative '
              >
              <Card {...category}/>
            </motion.div>
          ))}
          {store.isAuth&&store.user.adm?(
            <div className='flex w-[calc(25%-40px)] justify-center items-center '>
              <AButton/>
            </div> 
          ):(null)
          }
      </div>
    </div>
   
    )
  }
  