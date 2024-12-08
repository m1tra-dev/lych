'use client'

import Link from 'next/link'
import { useState,useRef, MouseEvent, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Context } from '@/app/layout';
import { ArrowLeft, ArrowRight, Check, ChevronRight, X } from 'lucide-react';
import { Button, NotificationUi } from '@/components/ui';
import { Api } from '../../../../services/api-client';
import { ActivateEmail } from './activateEmail';
import { IClose } from './log';
import { AnimateSharedLayout, motion } from 'framer-motion';
interface IValue{
  email:string | null ;
  password:string | null ;
  name:string | null ;
}
export const  Auth:React.FC<IClose> = ({
  onClose
}) => {
  const router = useRouter()
  const {store} = useContext(Context)
  const [errors,setErrors] = useState<IValue>({
    name:null,
    password:null,
    email:null,
 
  })
  const [press,setPress]=useState(false)
  const [isVisible,setIsVisible]=useState([true,false,false])
  const [isVisibleInput,setIsVisibleInput]=useState([true,false,false])
  const [isFocusInput,setIsFocusInput]=useState([false,false,false])
  const [lastActiveIndex, setLastActiveIndex] = useState(-1);
  const [inputValues, setInputValues] = useState({
    email:'',
    password:'',
    name:''
  });
  const updatedVisible = [...isVisible];
  const items=[{
    id:0,
    value:'введите почту',
    key:'email',
  },
  {
    id:1,
    value:'введите пароль',
    key:'password',
  },
  {
    id:2,
    value:'введите имя',
    key:'name',
  }
  ]


  const handleClick = (id: number) => {
    setLastActiveIndex(id);
    if (id==items.length-1){
      const res = store.registration(inputValues.email,inputValues.password,inputValues.name)
      res.then((state)=>{
        setPress(true)
        if (state===201){
          router.push('/')
        }
        else{
          const result = state.reduce((acc, item) => {
            const [key, message] = item.split(',');
            acc[key] = message;
            return acc;
        }, {});
          console.log(1,{...errors})
          const newErrors = { ...errors }; // Создаем копию текущих ошибок

          if (result.email) {
            newErrors['email'] = result.email; // Обновляем или добавляем ошибку по email
          } else {
            newErrors['email']=null; // Удаляем ошибку по email, если её нет
          }
          
          if (result.password) {
            newErrors['password'] = result.password; // Обновляем или добавляем ошибку по password
          } else {
            newErrors['password']=null; // Удаляем ошибку по password, если её нет
          }
          
          if (result.name) {
            newErrors['name'] = result.name; // Обновляем или добавляем ошибку по name
          } else {
            newErrors['name'] = null; // Удаляем ошибку по name, если её нет
          }
          setErrors(newErrors);
        }})
    }
    isVisibleInput[id+1] = true;
    updatedVisible[id] = false;
    updatedVisible[id+1] = true;
    
    setIsVisibleInput(isVisibleInput)
    setIsVisible(updatedVisible);
    
  }

  const handleInput =(id:number)=>{
    updatedVisible.forEach((element,index,arr)=>{
      arr[index]=false
    })
    updatedVisible[id] = true;
    setIsVisible(updatedVisible);
  }
  const handleInputChange = (index:number, key:string, value:string) => {
    
    setInputValues({ ...inputValues, [key] : value });
    
  };
  
  const handleFocus = (id:number) => {
    setIsFocusInput({ ...isFocusInput, [id] : true });
  };

  const handleBlur = (id:number,key:string) => {
    if (inputValues[key] === ''){
      setIsFocusInput({ ...isFocusInput, [id] : false })}
  };
  const handleInputClick = (id:number) => {
    setLastActiveIndex(id);
    handleInput(id)
  }
  console.log(lastActiveIndex,)
  return (
    <>
  <div 
    className={` ${store.user.isActivated === undefined?"flex":"hidden" } transition-all duration-300 ease-in-out border-black border-2 p-7 bg-white flex flex-col 
    items-center justify-between w-96 rounded-md`}>
    <div className="flex flex-row justify-between w-full">
      <p>Добро пожаловать!</p>
      {/* <Link href='/' className='h-6 w-auto text-xs flex justify-center items-center  '><ArrowLeft /></Link> */}
    </div>

    <ul className='w-full mt-2 h-auto'>
      {items.map((item, index) => (
        <li className='flex flex-col w-full mt-2' key={index}>
          <div className='flex gap-2 w-full '>
            {/* {errors[item.key] ? (
              <X className='text-red-500'/>
            ) : isVisibleInput[item.id] ? (
              <ChevronRight className='text-gray-400' />
            ) : (
              <Check className='text-green-400' />
            )} */}
            <div className="relative">
            <label
              htmlFor={`animated-input-${index}`}
              className={`${isVisibleInput[item.id] ? '' : 'hidden'} cursor-text absolute left-2.5 text-center transition-all duration-300 ease-in-out ${
                isFocusInput[item.id]  ? 'text-xs text-gray-400 -top-0' : 'text-base text-gray-500 top-1/2  transform -translate-y-1/2'
              }`}
            >
              {item.value}
            </label>

              <motion.input 
                id={`animated-input-${index}`}
                onFocus={()=>handleFocus(item.id)}
                onBlur={()=>handleBlur(item.id,item.key)}
                onChange={(e) => handleInputChange(item.id, item.key, e.target.value)} 
                className={`${isVisibleInput[item.id] ? '' : 'hidden'} outline-none border border-gray-300 rounded-md p-2.5 w-full transition-all duration-300 ease-in-out ${
                  isFocusInput[item.id] ? 'border-gray-400' : ''
                }`}
                onClick={()=>handleInputClick(item.id)} 
              />
            </div>
            <motion.button 
              initial={{ opacity: 1, translateY: 0 }}
              animate={{ opacity: isVisible[item.id] ? 1 : 0,                
                translateY:
                isVisible[index]
                  ? 0
                  : lastActiveIndex < index
                  ? -60
                  : 60
                  ,
              }}
              transition={{ duration: 0.3 }} // Настройте время перехода по вашему усмотрению
              className={`rounded-md bg-transparent border-2 border-gray-400 hover:bg-gray-100 w-12 flex justify-center items-center`}
              onClick={() => handleClick(item.id)}
              style={{ display: isVisible[item.id] ? 'flex' : 'none' }} // Чтобы избежать проблем с отображением
            >
              <ArrowRight className='text-gray-400 transition-all' />
            </motion.button>       
          </div>
        </li>
      ))}
      {Object.keys(errors).map((key, index) => (
        <div className='absolute bottom-0 right-0 m-10' key={index} >
          {errors[key] && press ? (
            <NotificationUi onClose={() => null}>
              <p className='text-white'>{errors[key]}</p>
            </NotificationUi>
          ) : null}
        </div>
      ))} 
    </ul>
  </div>
  <div className={`${store.user.isActivated === false ? "block" : "hidden"} z-50`}><ActivateEmail onClose={onClose}/></div>   
  
</>

      )
  }