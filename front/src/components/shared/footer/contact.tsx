import React from 'react'

const value = ['+7 (999) 390-65-43','+7 (999) 390-65-43']


export default function Contact({}) {
  return (
    <div className='flex flex-col'>
        <h1 className='text-lg text-white font-bold whitespace-nowrap '>Связаться с нами</h1>
        <div className='flex flex-col gap-2 pt-3'>
            {value.map((item)=>(
                <a href="" className='text-gray-300 text-base'>{item}</a>
            ))}
        </div>
    </div>
  )
}