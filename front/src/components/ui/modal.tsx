import { IProducts } from '@/interface/IProducts'
import React from 'react'


export const Modal:React.FC<IProducts> = (props) => {
  return (
    <>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-50'></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 rounded-lg z-50 bg-white">{props.name}</div>
    </>
  )
}