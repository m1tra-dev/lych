import React, { useEffect, useState } from 'react'
import { Item } from '../basket/basket-item/item'
import CounterStore from '@/store/counter-store';
import { Api } from '../../../../services/api-client';

export const ItemsWrap = () => {
  const getProducts=JSON.parse(localStorage.getItem('BasketData'))
  const [cart,setCart] = useState([])
  useEffect(()=>{
    Api.products.findByCard(getProducts).then(item => setCart(item))
  },[])
  
  return (
    <div className=''>
        {cart.map((product, index) => ( 
        <div key={index} className="product-wrap">
          <Item name={product.name} price={product.price} counterStore={new CounterStore(1)}/>
        </div>
    ))}</div>

  )
}