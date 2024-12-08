// 'use client'
// import { motion, useScroll, useSpring, useTransform } from "framer-motion"
// import { FC, useEffect, useRef, useState } from "react"
// import { Wrap } from "./wrapper"
// import { MoveRight } from "lucide-react"
// import { ParallaxWrap } from "./parallax"
// import gsap from "gsap"
// import ScrollToPlugin from "gsap/ScrollToPlugin"
// import Image from "next/image"

// export const Hero:FC = (item) => {

//     gsap.registerPlugin(ScrollToPlugin)
//     const {scrollY} = useScroll()
//     const scaleX = useTransform(scrollY, [0, 500], [1, 2]); // Увеличение по X
//     const scaleY = useTransform(scrollY, [0, 500], [1, 2]); // Увеличение по Y
  
//     const scrollTo = (target:string) => {
//         gsap.to(window,{duration: 3,         scrollTo: {
//             y: target,
//             autoKill: false // предотвращает остановку анимации на моменте прокрутки
//         },
//         ease: "power2.inOut"})
//     }
//     const springX = useSpring(scaleX, { stiffness: 300, damping: 30 });
//     const springY = useSpring(scaleY, { stiffness: 300, damping: 30 });
    
//     return(
   
//         // <motion.div 
//         //     className=" h-[calc(100vh-80px)] flex justify-center items-start flex-col gap-4  ">
//         //     <Wrap>
            
                
//         //         <h1 className="text-secondary text-7xl text-start font-bold">Привет, мы Луч!</h1>
//         //     </Wrap>
//         //     <Wrap>
//         //         <p className="text-secondary text-2xl text-center font-medium"> Тепло домашнего уюта и разнообразие блюд для каждого</p>    
//         //     </Wrap> 
//         //     <Wrap> 
//         //         <p className="text-secondary text-base"> Столовая "Луч" расположена в самом центре Санкт-Петербурга, всего в нескольких шагах от Невского проспекта. Здесь царит атмосфера домашнего уюта и дружелюбия. Мы предлагаем широкий выбор блюд, приготовленных из свежих и качественных ингредиентов.</p>      
//         //     </Wrap> 
//         //     <Wrap> 
//         //         <motion.div 
//         //             whileHover={{
//         //                 translateX: -5,
//         //                 translateY: -5,
//         //                 transition: { duration: 0.3 },
//         //             }}

//         //             className="rounded-md  bg-black">

//         //             <motion.div 
//         //                 whileHover={{
//         //                     translateX: -5,
//         //                     translateY: -5,
//         //                     transition: { duration: 0.3 },
//         //                 }}
//         //                 className="rounded-md px-5 py-2   bg-violet-300 -m-0.5 border border-black">Подробнее о нас</motion.div>
//         //         </motion.div>
//         //     </Wrap> 
//         // </motion.div>
//         <>
//         <div 
//         className="absolute bg-violet-300 bottom-0 top-0 left-0 right-0  " // Используем z-index для наложения
//         style={{
//             clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 63%)',
//         }}>     
//      </div>
//             <div className="relative flex justify-center w-full p-4">

//                 <div className="sm:grid grid-cols-2 grid-rows-3 min-h-screen max-w-screen-xl   ">
//                      <motion.div
//                          initial={{y:50,opacity:0}}
//                          whileInView={{y:0,opacity:1}}
//                          transition={{duration:0.5, delay:0.7}}
//                          viewport={{ once: true }} 
//                          className="self-center">
//                          <p className="text-secondary  text-2xl pb-10 row-span-1"> У нас царит атмосфера домашнего уюта и дружелюбия. Мы предлагаем широкий выбор блюд, приготовленных из свежих и качественных ингредиентов.</p>           
//                          <div 
//                              onClick={() => scrollTo('#card')}
//                              className="px-5 py-2 w-1/2    -m-0.5 border-b border-black relative ">
//                                  <span className="w-full h-full">Подробнее о нас</span>
//                                  <MoveRight className="absolute top-1/2 -translate-y-1/2 right-5" />
//                          </div>
//                      </motion.div>
//                      <p className="hidden text-secondary text-5xl  self-center text-center font-medium"><Wrap>Тепло домашнего уюта и разнообразие блюд для каждого</Wrap></p> 
//                      {/* <motion.div 
//                         className=" col-span-2   absolute bottom-0 left-0 right-0  ">
//                         <motion.h1 
//                             className="text-secondary  text-center font-bold text-[24.5rem] whitespace-nowrap" 
//                             viewport={{ once: true }} 
//                             style={{scaleX,scaleY}}
//                             initial={{ y: 350}} // Начальное положение за границей
//                             whileInView={{ y: 0}} // Конечное положение в видимой области
//                             transition={{ duration: 0.5, delay:1 }} 
//                             // initial={{x: '2000px'}}
//                             // animate={{ x: '-2000px' }} // Конечное положение за границей слева
//                             // transition={{
//                             //   duration: 10, // Длительность анимации
//                             //   repeat: Infinity, // Повторять бесконечно
//                             //   ease: 'linear', // Линейная анимация
//                             // }}
//                          >
                            
//                              МЫ - ЛУЧ
//                         </motion.h1>
                        
//                      </motion.div> */}

//                 </div>
//             </div>
//        </>
//     )
// }
'use client'


import React, { useEffect } from "react";
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"

import {

  useMotionTemplate,

  useMotionValue,

  animate,
  motion,

} from "framer-motion";


const COLORS_TOP = ["#FF6F61", "#FF4E50", "#FF3B30", "#FF9AA2", "#FF2D55", "#FF007A"];



export const Hero = () => {

  const color = useMotionValue(COLORS_TOP[0]);

    gsap.registerPlugin(ScrollToPlugin)

    const scrollTo = (target:string) => {
        gsap.to(window,{duration: 3,         scrollTo: {
            y: target,
            autoKill: false // предотвращает остановку анимации на моменте прокрутки
        },
        ease: "power2.inOut"})
    }

    

  useEffect(() => {

    animate(color, COLORS_TOP, {

      ease: "easeInOut",

      duration: 10,

      repeat: Infinity,

      repeatType: "mirror",

    });


  }, []);

  const backgroundImage1 = useMotionTemplate`linear-gradient(${color},#fff )`;



  const border = useMotionTemplate`1px solid ${color}`;

  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;


  return (

    <motion.section

      style={{

      

      }}

      className="  min-h-screen place-content-center overflow-hidden   "

    >
        <div className="absolute top-0 bottom-0 w-full h-full blur-3xl">
            <motion.div
                style={{

                    backgroundImage:backgroundImage1,

                    clipPath: 'polygon(0 25%, 53% 72%, 100% 45%, 100% 62%, 100% 100%, 0 100%)'

                }}
                className=" absolute top-0 bottom-0 left-0 right-0 "
            >

            </motion.div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-10 flex flex-col items-center w-full">
            <div className="flex flex-col gap-4 sm:gap-5 justify-center items-center w-full px-4">
                <h1 className="text-5xl  font-bold text-gray-950 leading-tight sm:text-7xl sm:leading-tight">Мы - луч</h1>
                <p className="sm:max-w-xl w-full text-base sm:text-2xl text-center text-gray-800 leading-relaxed">Добро пожаловать в нашу столовую! Мы предлагаем вкусные и здоровые блюда, приготовленные с любовью. Уютная атмосфера и дружелюбный персонал ждут вас!</p>
                
                <motion.button  
                    onClick={() => scrollTo('#card')}       
                    style={{

                    border,

                    boxShadow,

                    }} className="max-w-xl px-3  py-2 rounded-2xl  text-base sm:px-5 sm:text-lg text-gray-800 leading-normal">
                    Корпоративное меню
                </motion.button>
            </div>
        </div>
    </motion.section>

  );

};
