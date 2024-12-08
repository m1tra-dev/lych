import React from 'react'


const value = ['О нас','Корпоративным клиентам','Корзина','Войти']


export default function Legal({}) {
  return (
    <div className='flex flex-col'>
        <h1 className='text-lg text-white font-bold'>Навигация</h1>
        <div className='flex flex-col gap-2 pt-3'>
            {value.map((item)=>(
                <a href="" className='text-gray-300 text-base'>{item}</a>
            ))}
        </div>
    </div>
  )
}