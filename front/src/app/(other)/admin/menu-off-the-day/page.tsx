'use client'
import { Context } from '@/app/layout'
import { Button, Checkbox, NotFound } from '@/components/ui'
import React, { useContext, useEffect, useState } from 'react'
import { Api } from '../../../../../services/api-client'
import { IProducts } from '@/interface/IProducts'

type Props = {}

export default function MenuOffTheDay({}: Props) {
  const {store} = useContext(Context)
  const [products,setProducts]=useState<IProducts[]>([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Если чекбокс уже выбран, убираем его из массива
        return prevSelected.filter((i) => i !== index);
      } else {
        // Если чекбокс не выбран, добавляем его в массив
        return [...prevSelected, index];
      }
    });
  };

  const handleClick = () => {
    Api.products.updateMenu(selectedCheckboxes)
  }

  {store.isAuth&&store.user.adm&&
    useEffect(()=>{
      Api.products.search("",null).then(items => {
          setProducts(items)
      })
    },[])
   }
  return (
    <div className="min-h-screen flex  justify-start items-start p-10 gap-10 w-full h-full  "> 
        {store.isAuth&&store.user.adm?(
          <>
            <div className=' w-1/3 '>
            {products?.map((item,index)=>(
              <div key={index} className='mb-2 border-2 border-black p-5 w-full justify-between flex'>
                <span className='text-xl'>{item.name}</span>
                <Checkbox 
                  style='h-full aspect-square'
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedCheckboxes.includes(index)}
                >{null}</Checkbox>
              </div>
            ))}
            </div>
            <Button onClick={handleClick} style='px-5 py-5 text-xl'>Подтвердить</Button>
          </>
            ):(
            <NotFound/>
        )}
   
   
</div>
  )
}