'use client'

import { useState, useEffect, createContext } from 'react';

import { MenuNav } from '@/components/shared/menu/menuBar/nav';
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Api } from '../../../../../services/api-client';
import { IProducts } from '@/interface/IProducts';
import Filtered from './MenuOffTheDay';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export const searchContext = createContext([])

export default function MenuNavBar({
  children
}: Readonly<{
  children: React.ReactNode}>) {
  const [value, setValue] = useState('');
  const [focused,setFocused] = useState(false)
  const [products,setProducts] = useState<IProducts[]>([])
  let path:string[] | null | string = usePathname().split('/')
  path[path.length-1].length==0?path=null:path=path[path.length-1]
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value); 
  };
  useEffect(()=>{
      Api.products.search(value,path).then(items => {
          setProducts(items)
      })
  },[value,path]) 
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    Api.category.categories().then(items => {
        setCategories(items)
    })
  },[])
  const handleClick=()=>{
    setFocused(false)
  }
  console.log(categories)
  if (categories.length==0){
    return (
      <div className='h-screen '>load...</div>
    )
  }
  
  return(
    <>
      <div className={`flex flex-col pb-5 `} >
        <MenuNav categories={categories}/>
        <div className='flex gap-2  mt-5'>
        {focused&&
          <AnimatePresence>
            <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              onClick={handleClick} className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-50'/>
          </AnimatePresence>}
          <div className={`flex flex-col relative w-72  ${focused?"z-50":"z-30"} `}>
              <Input 

                onChange={handleChange}
                onFocus={()=>setFocused(true)}
                value={value}
                placeholder={"Поиск"}
                style={" py-1.5"}
                icon={<Search size={28} strokeWidth={1}
              />}/>
              <div className={`absolute  w-full  bg-white rounded-md  top-11 shadow-md transition-all duration-200 ' 
                  ${focused ? 'visible  opacity-100 top-8' : 'invisible opacity-0'}`}>
                  {products.map((product,index)=>(
                      <>
                          {index<5&&
                              <Link href={`${product.id}`}>
                                  <div className='px-3 py-2 hover:bg-gray-300'>{product.name}</div>
                              </Link>
                          }
                      </>
                  ))}
              </div>
          </div>

        </div>
      </div>
      <searchContext.Provider value={products}>
            {children}
      </searchContext.Provider>
    </>
  );
}