'use client'


import React, { useEffect } from "react";
import Image from 'next/image'
import {

  useMotionTemplate,

  useMotionValue,

  animate,
  motion,

} from "framer-motion";


const COLORS_TOP = [
  "#484848",  // темный серый
  "#363636",  // более темный серый
  "#242424"   // очень темный серый, но не черный
];

const COLORS_YELLOW = [
  "#F8CB50",  // основной цвет
  "#F9D25B",  // светлее
  "#f8cb50",  // еще светлее
  "#F9DD72",  // более светлый
  "#FAE08D",  // светлый
  "#FBEB9A"   // очень светлый
];

export const CorporativeHero = () => {

  const color = useMotionValue(COLORS_TOP[0]);
  const color1 = useMotionValue(COLORS_YELLOW[0]);



  useEffect(() => {

    animate(color, COLORS_TOP, {

      ease: "easeInOut",

      duration: 10,

      repeat: Infinity,

      repeatType: "mirror",

    });
    animate(color1, COLORS_YELLOW, {

      ease: "easeInOut",

      duration: 10,

      repeat: Infinity,

      repeatType: "mirror",

    });


  }, []);

  const backgroundImage1 = useMotionTemplate`linear-gradient(${color1} ,#171717 )`; //fa322e

  const border = useMotionTemplate`1px solid ${color1}`;

  const boxShadow = useMotionTemplate`0px 4px 12px ${color1}`;





  return (
    <>
    <motion.section

      style={{

      

      }}

      className=" relative min-h-[calc(100vh-96px)] place-content-center overflow-hidden   "

    >
        <div className="absolute top-0 bottom-0 w-full h-full blur-3xl z-10">
            <motion.div
                style={{

                    backgroundImage:backgroundImage1,

                    clipPath: 'polygon(63% 77%, 100% 60%, 100% 100%, 0 100%, 0 47%)'

                }}
                className=" absolute top-0 bottom-0 left-0 right-0 "
            >

            </motion.div>
        </div>
        
    </motion.section>
    <div className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-10 flex flex-col items-center w-full">
            <div className="flex flex-col gap-4 sm:gap-5 justify-center items-center w-full px-4">
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">Мы - луч</h1>
                <p className="sm:max-w-xl w-full bg-gradient-to-br from-white to-gray-400 bg-clip-text text-base sm:text-2xl text-center  text-transparent leading-relaxed">Добро пожаловать в нашу столовую! Мы предлагаем вкусные и здоровые блюда, приготовленные с любовью. Уютная атмосфера и дружелюбный персонал ждут вас!</p>
                
                <motion.button  
                    onClick={() => null}       
                    style={{

                    border,

                    boxShadow,

                    }} className="max-w-xl px-3   py-2 rounded-2xl  text-base sm:px-5 sm:text-lg bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent leading-normal">
                    Корпоративное меню
                </motion.button>
            </div>
        </div>
    <div>
      <img src="banner.jpg" alt="" className="absolute top-0 left-0 h-screen object-center  object-cover"/>
    </div>
    </>                
  );

};