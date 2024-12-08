import { Button, Input } from '@/components/ui'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import React, { EventHandler, useState } from 'react'

type Props = {}

export const Contacts = () => {
    const [focused,setIsFocused] = useState(false)
    const [inputValues,setInputValues] = useState<null|string>(null)
    const handleInputChange = (value:string) => {
        setInputValues(value);
      };
    return (
    <div className='flex flex-col gap-4 items-center px-4  mx-auto my-20 lg:flex-row '>
        <div className=' w-full  grid  grid-cols-12  gap-4  lg:w-[900px]  lg:grid-rows-5 '>
            
            <motion.div initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0}} viewport={{ once: true }} className='rounded-lg  border border-black bg-zinc-800 p-6 col-span-12 text-3xl  flex flex-col justify-between'>
                <h2 className='text-xl font-semibold self-start '>Присоединяйтесь к нашей рассылке</h2>
                <div className='flex justify-between gap-10'>
                    <div className="relative w-full">
                        <label
                          htmlFor={`label`}
                          className={` cursor-text absolute left-2.5 text-center transition-all duration-300 ease-in-out ${
                            inputValues || focused  ? 'text-xs text-gray-400 -top-0' : 'text-base text-gray-500 top-1/2  transform -translate-y-1/2'
                          }`}
                        >
                          {"Напишите свой e-mail"}
                        </label>
                      
                          <input 
                            id={`label`}
                            onChange={(e) => handleInputChange(e.target.value)} 
                            onFocus={()=>setIsFocused(!focused)}
                            onBlur={()=>setIsFocused(!focused)}
                            className={` text-base outline-none border p-2.5 l border-gray-300 rounded-md  w-full transition-all duration-300 ease-in-out ${
                                focused ? 'border-gray-400' : ''
                            }`}
                            
                          />
                    </div>
                    <Button onClick={()=>null} style='rounded-lg'>
                        <div className='flex gap-2 items-center'>
                            <Mail />
                            <span className='md:text-lg '>Отправить</span>
                        </div>
                    </Button>
                </div>
            </motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.1}} className='rounded-lg   border  border-black p-6 col-span-6   items-center gap-4 md:col-span-3 flex flex-col justify-between  '>
                <h2 className='text-xl font-semibold self-start '>Часы работы:</h2>
                <ul>
                    <li className='text-lg font-medium self-start '>Пн-Пт: 8:00-20:00</li>
                    <li className='text-lg font-medium self-start '>Сб-Вс: 8:00-20:00</li>
                </ul>
            </motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.2}} className='row-span-2 md:row-span-1 rounded-lg border flex justify-between flex-col border-black bg-zinc-800 p-6 col-span-6 md:col-span-9 '>
                <h2 className='text-xl font-semibold'>Наши <span className='bg-violet-300 text-white px-1'>контакты</span></h2>
                <p className='text-lg font-medium text-black '>Мы всегда рады вашим вопросам, предложениям и отзывам! Свяжитесь с нами любым удобным для вас способом</p>
            </motion.div>
            <motion.iframe viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.3}} className="rounded-lg border aspect-square border-black w-full   col-span-12 md:h-full md:row-span-3 md:col-span-6" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5af44070ec2c3c6e67093306af1e33d7055c9be656bd1a89696e2833cc36bcda&amp;source=constructor" ></motion.iframe>          
            {/* <div className='rounded-lg border  border-black  p-6 col-span-12 row-span-2 md:col-span-6'>
                <h2 className='text-2xl font-semibold text-white bg-violet-300 pl-1.5 '>Наши контакты</h2>
                <p className='text-xl font-medium text-black pl-1.5 '>Мы всегда рады вашим вопросам, предложениям и отзывам! Свяжитесь с нами любым удобным для вас способом</p>
            </div> */}
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.4}} className='rounded-lg border border-black p-6 col-span-6 h-20 md:row-span-1 md:h-full bg-red-500 md:col-span-3'></motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.5}} className='rounded-lg border border-black p-6 col-span-6 h-20 md:row-span-1 md:h-full bg-blue-500 md:col-span-3'></motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.6}} className='rounded-lg border border-black p-6 col-span-6 h-20 md:row-span-1 md:h-full bg-green-500 md:col-span-3'></motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.7}} className='rounded-lg border border-black p-6 col-span-6 h-20 md:row-span-1 md:h-full bg-white md:col-span-3'></motion.div>
            <motion.div viewport={{ once: true }} initial={{opacity:0,scale:0}} whileInView={{opacity:1,scale:1}} transition={{duration:0.5, delay:0.8}} className='rounded-lg flex items-center justify-center text-xl p-6 col-span-12 w-full md:col-span-6 '>Санкт-Петербург, улица 2-й Луч, 3</motion.div>

        </div>
        <motion.div viewport={{ once: true }} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5, delay:0.9}} style={{ overflow: 'hidden', position: 'relative' }} className='aspect-square w-full md:w-[500px] h-full'>
            <iframe
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid #000',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
              src="https://yandex.ru/maps-reviews-widget/139826132852?comments"
            ></iframe>
            <a
            href="https://yandex.ru/maps/org/luch/139826132852/"
            target="_blank"
            style={{
              boxSizing: 'border-box',
              textDecoration: 'none',
              color: '#b3b3b3',
              fontSize: '10px',
              fontFamily: 'YS Text,sans-serif',
              padding: '0 20px',
              position: 'absolute',
              bottom: '8px',
              width: '100%',
              textAlign: 'center',
              left: '0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'block',
              maxHeight: '14px',
              whiteSpace: 'nowrap',
              padding: '0 16px'
            }}
            >
            Луч на карте Санкт‑Петербурга — Яндекс Карты
        </a>  
        </motion.div>  
    </div>
  )
}