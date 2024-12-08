import { Button, Sheet } from '@/components/ui'
import { Cross, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, forwardRef, FC } from 'react'
import { Item } from '@/components/shared/basket/basket-item/item';
import CounterStore from '@/store/counter-store';
import { ItemsWrap } from './items-wrap';
import { Api } from '../../../../services/api-client';
import { autorun } from 'mobx';
import { IProducts } from '@/interface/IProducts';
import { AnimatePresence, motion, Reorder } from 'framer-motion';

type Product = [id:number, count:number];

interface ICart{
  children:React.ReactNode,
}

const variants = {
  initial:{
      opacity:0,
  },
  animate:{
      opacity:1,
  },
  exit:{
      opacity:0,
  }
}
export const BasketBtn:FC<ICart> = ({children}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const storedData = localStorage.getItem('BasketData');
  const getProducts: Product[] = storedData ? JSON.parse(storedData) : [];
  const firstElements = getProducts?.map(subArray => subArray[0]);
  const [cart,setCart] = useState<IProducts[]>([])
  // const [counterStores, setCounterStores] = useState([]);
  useEffect(()=>{
    Api.products.findByCard(firstElements).then(item => setCart(item))
  },[])

  const counterStores = cart.map((product, index) => new CounterStore(index, Number(product.price)));
  const calculateTotal = () => {
    return counterStores.reduce((accumulator, counterStore) => {
      return accumulator + (counterStore.price * counterStore.count);
    }, 0);
  };

  const [result, setResult] = useState(calculateTotal());

  useEffect(() => {
    const disposer = autorun(() => {
      setResult(calculateTotal());
    });

    return () => {
      disposer(); 
    };
  }, [counterStores]);

  useEffect(()=>{
    const storedData = localStorage.getItem('BasketData');
    const parsedData: Product[] = storedData ? JSON.parse(storedData) : [];
  },[cart])

  const onRemove = (id:number) => {
    const storedData = localStorage.getItem('BasketData');
    const parsedData: Product[] = storedData ? JSON.parse(storedData) : [];
    const updatedData = parsedData.filter((product:Product) => product[0] !== id);
    localStorage.setItem('BasketData', JSON.stringify(updatedData));
    setCart(
      cart.filter(product=>product.id !== id)
    )
    
  }

  return (
    <button onClick={toggleMenu} >
      {children}
      {isMenuOpen&&
        <AnimatePresence>  
          <Sheet onClick={toggleMenu}>
            <motion.div
              className='h-full'
              {...variants}
              transition={{delay:0.3}}>
              <X onClick={toggleMenu} className='text-black absolute top-0 right-0 mt-2 mr-2' size={40} />
              <div className='text-black  flex flex-col h-full  overflow-scroll '>
                  <div className='mt-10 pb-10 shadow-sm '> 
                      <span className='text-3xl '>Корзина</span>
                  </div>
                  <div className='text-xl self-start ml-5'>Ваши покупки:</div>
                  <div className='flex justify-between flex-col h-full'>
                    <Reorder.Group axis='y' values={cart} onReorder={setCart}>
                      <AnimatePresence>
                        {cart.map((product, index) => ( 
                          <Item key={product.id} product={product} onRemove={onRemove} counterStore={counterStores[index]}/> 
                        ))}
                      </AnimatePresence>  
                    </Reorder.Group>
                  </div>
                  <div className='w-full flex justify-between p-5'> 
                    <span className='text-2xl text-gray-400:'>Сумма заказа</span>
                    <span className='text-xl '>{result}</span>
                  </div>
              </div>
            </motion.div>
          </Sheet>
         </AnimatePresence>  
      }
    </button>
  )
}