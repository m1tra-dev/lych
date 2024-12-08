import { Accordion } from '@/components/ui/accordion';
import { animate, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';

const value =[
      {
        "meal": "Завтрак",
        "time": "8:00-12:00",
        "options": [
          {
            "type": "Континентальный завтрак",
            "description": [
              "Мини-круассаны с джемом и маслом",
              "Ассорти свежих фруктов",
              "Йогурты различных вкусов",
              "Кофе (эспрессо, американо) и чай"
            ]
          },
          {
            "type": "Завтрак 'Шведский стол'",
            "description": [
              "Овсяная каша с ягодами и медом",
              "Яичница с овощами и беконом",
              "Тосты с авокадо и помидорами",
              "Соки (апельсиновый, яблочный)"
            ]
          }
        ]
      },
      {
        "meal": "Обед",
        "time": "12:00-17:00",
        "options": [
          {
            "type": "Легкий бизнес-ланч",
            "description": [
              "Салат Цезарь с курицей",
              "Крем-суп из брокколи",
              "Гречка с грибами",
              "Филе рыбы на гриле с лимонным соусом",
              "Десерт: Тирамису или фруктовый тарт"
            ]
          },
          {
            "type": "Обед 'Шведский стол'",
            "description": [
              "Ассорти салатов (овощной, греческий, с тунцом)",
              "Основные блюда: куриное филе с травами, запеченные овощи, паста с соусом песто",
              "Хлебная корзина",
              "Напитки: минеральная вода, лимонад"
            ]
          }
        ]
      },
      {
        "meal": "Ужин",
        "time": "17:00-20:00",
        "options": [
          {
            "type": "Ужин 'Аля carte'",
            "description": [
              "Закуска: Карпаччо из говядины с пармезаном",
              "Основное блюдо: Утиная грудка с вишневым соусом и картофельным пюре",
              "Вегетарианский вариант: Ризотто с грибами и шпинатом",
              "Десерт: Шоколадный фондан с мороженым"
            ]
          },
          {
            "type": "Ужин 'Шведский стол'",
            "description": [
              "Ассорти закусок (мясные деликатесы, сыры, оливки)",
              "Основные блюда: мясные и рыбные блюда на гриле, овощи на пару",
              "Гарниры: картофель фри, рис с зеленью",
              "Десерт: Пирожные и свежие фрукты"
            ]
          }
        ]
      }
    
]

export const Menu = () => {
  const COLORS_TOP = [
    "#F8CB50",  // основной цвет
    "#F9D25B",  // светлее
    "#f8cb50",  // еще светлее
    "#F9DD72",  // более светлый
    "#FAE08D",  // светлый
    "#FBEB9A"   // очень светлый
  ];
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {

    animate(color, COLORS_TOP, {

      ease: "easeInOut",

      duration: 10,

      repeat: Infinity,

      repeatType: "mirror",

    });


  }, []);

  const backgroundImage1 = useMotionTemplate`linear-gradient(${color},#171717 )`;
  const ref = useRef(null)
    const paddingValues = [400, 200, 0]; 
    const { scrollYProgress } = useScroll({target:ref});
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), { stiffness: 100, damping: 30 });  
    return (
      <div className='relative '>
                <div className="absolute top-0 bottom-0 w-full h-full z-10 blur-3xl">
            <motion.div
                style={{

                    backgroundImage:backgroundImage1,

                    clipPath: 'polygon(79% 58%, 100% 25%, 100% 50%, 100% 100%, 0 100%, 0 24%)',

                }}
                className=" absolute top-0 bottom-0 left-0 right-0 "
            >

            </motion.div>
        </div>
      <motion.section id='menu' className='bg-neutral-900  ' ref={ref} >
        <div className='justify-self-center overflow-hidden relative min-h-screen grid  sm:pt-0 sm:grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3   pt-20 w-screen self-center xl:max-w-screen-xl px-4'>
        <h1 className='sm:text-6xl  font-bold  text-4xl  bg-otherYellow-300 absolute top-0 lg:w-1/2 py-2 px-2 mx-4  box-border '>Корпоративное меню</h1>
        {value.map((item, index) => (
          <div key={index} className={`${index==2&&'w-full justify-self-center md:w-1/2 md:col-span-2 xl:col-span-1 xl:w-full'} z-20`}> {/* Не забудьте добавить уникальный ключ */}
        
            <h2
              className={` text-5xl font-bold px-5 text-[#DFDFDF]`}
              style={{ paddingTop: isMobile ? '0px' :`${paddingValues[index] || 0}px` }} // Используем значение из массива или 0 по умолчанию
            >
              {item.meal}
            </h2>
            <h3 className='text-4xl font-bold pt-4 px-5 text-[#DFDFDF]'>{item.time}</h3>
            <div className='px-10 mt-10'>   
                {item.options.map((items,index)=>(
                    <div key={index} className='border-b-2 border-[#DFDFDF]'>
                        <h4 className='text-2xl font-medium py-8 text-[#DFDFDF]'>{items.type}</h4>
                    </div>
                ))}
            </div>
          </div>
        ))}
        </div>
      </motion.section>
      </div>
    )
}