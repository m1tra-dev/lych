'use client'

import Link from 'next/link'
import { useState,useRef, MouseEvent, useContext, useEffect } from 'react';
import  {Context}  from '@/app/layout';
import { useRouter } from 'next/navigation';
import {Auth} from './auth';
import { ArrowLeft, MoveLeft } from 'lucide-react';
import { Button, Checkbox } from '@/components/ui';
import { ActivateEmail } from './activateEmail';
import { motion } from 'framer-motion';

export interface IClose{
  onClose:()=>void;
}
export const Log:React.FC<IClose> = ({
  onClose,
}) => {
  const router = useRouter();
  const {store} = useContext(Context)
  const [error,setError] = useState('')
  const [auth,setAuth] = useState(false)
  const [email,setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('');
  const [checked, setIsChecked] = useState(false);
  const toggleMenu = () => {
    setIsChecked(!checked);
  };

  // useEffect(() => {
  //     const handlePageHide = (event) => {
  //       if (checked) {
  //         event.preventDefault();
  //         store.logout();
  //       }
  //     };
  
  //     const handleVisibilityChange = () => {
  //       if (document.visibilityState === 'hidden' && checked) {
  //         // Можно также выполнить некоторые действия при скрытии вкладки
  //       }
  //     };
  
  //     // Слушаем событие pagehide для закрытия вкладки
  //     window.addEventListener('pagehide', handlePageHide);
  
  //     // Слушаем событие visibilitychange для проверки видимости
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  
  //     return () => {
  //       window.removeEventListener('pagehide', handlePageHide);
  //       document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     };
  //   }, [checked]);
  
  const handleAuth =()=>{
    setAuth(true)
  }
  const handleClick = () => {
    const res = store.login(email,password)
    res.then((state)=>{
      if (state===201){
        router.push('/')
      }
      else{
        setError('Некорректная почта или пароль')
      //   const result = state.reduce((acc, item) => {
      //     const [key, message] = item.split(',');
      //     acc[key] = message;
      //     return acc;
      // }, {});
      //   console.log(1,result)
      //   if (result.email){setErrorEmail(result.email)} else{setErrorEmail(null)}
      //   if (result.password){setErrorPass(result.password)} else{setErrorPass(null)}
      }})
    
  }
  console.log(auth , store.user.isActivated)
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose} 
        className="fixed w-full h-full bg-black/50  z-50 top-0 right-0 left-0"/>
      <motion.div 
        initial={{ opacity: 0, y:10 }}
        animate={{ opacity: !auth ? 1 : 0, y: !auth ? 0 : 10 }} 
        exit={{ opacity: 0, y:0 }}
        transition={{ duration: 0.1 }}
        className={`${auth ?'hidden':''} border-2 border-black p-4 bg-white flex flex-col items-center  absolute w-96 h-[500px] z-50 rounded-md`}>
        
        <div className="flex flex-row-reverse justify-between w-full">
          <h1 className='text-black text-base'>Луч</h1>
          <button onClick={onClose} className='text-black h-6 w-auto text-xs flex justify-center items-center p-1 '><ArrowLeft /></button>
        </div>
        <div className='p-5 w-full'>
          <div className='flex my-10 flex-col'>
            <input  onChange={(e) => setEmail(e.target.value)} placeholder={'введите почту'} className={` w-full text-lg text-secondary outline-none h-6 py-5 border-b-2 border-gray-400 placeholder:text-gray-400 `} />
          </div>
          <div className='flex my-10 h-16 flex-col'>
            <input  onChange={(e) => setPassword(e.target.value)} placeholder={'введите пароль'} className={`w-full text-lg text-secondary outline-none h-6 py-5 border-b-2 border-gray-400 placeholder:text-gray-400`} />
            {error&&<p className='text-red-500 mt-4'>{error}</p>}
          </div>

          <div className='flex flex-col gap-10 w-full '>
            <div className='flex justify-between '>
              <Checkbox checked={checked} onChange={toggleMenu}><span className='text-gray-400'>Чужой компьютер</span></Checkbox>
              <button className='text-gray-400 underline '>забыли пароль</button>
            </div>
            <Button onClick={handleClick} disabled={false} style='py-2'>Войти</Button>  
            <button className='text-black' onClick={handleAuth}>Зарегистрироваться</button>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y:50 }}
        animate={{ opacity: auth ? 1 : 0, y: auth ? 0 : 50 }} // Замените '100px' на нужное вам значение
        exit={{ opacity: 0, y:0 }}
        transition={{ duration: 0.3 }}
        className={`${auth ? '':'hidden'} overflow-hidden z-50`}>
        <Auth onClose={onClose} />
      </motion.div>
      
    </>
      )
  }