import { Facebook } from 'lucide-react'
import React from 'react'


const value = ['ВКонтакте','Телеграмм','Корзина','Войти']


export default function Legal({}) {
  return (
    <div className='flex  gap-2'>
        {value.map((item,index)=>(
            <button key={index} className='border-2 border-violet-300 rounded-full p-2 flex justify-center'><Facebook className='text-violet-300' strokeWidth={2} color='#c4b5fd ' /></button>
        ))}
    </div>

  )
}