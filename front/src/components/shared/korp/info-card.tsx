// import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion';
// import { useEffect, useRef } from 'react';
// import { Wrap } from './wrapper';
// import { ChartNoAxesCombined, FileChartPie, FileSliders, Handshake, MessageCircleMore, PanelsTopLeft, SearchCheck, UserRoundPen } from 'lucide-react';
// import { useMediaQuery } from 'react-responsive';
// import useWindowWidth from '@/components/utils/hooks/useWindowWidth';

const value = [
    {
        "title": "Качественные ингредиенты",
        "description": "Мы используем только свежие и высококачественные продукты, что гарантирует вкусные и полезные блюда."
    },
    {
        "title": "Индивидуальный подход",
        "description": "Каждый корпоративный клиент может рассчитывать на персонализированное меню, соответствующее его требованиям и предпочтениям."
    },
    {
        "title": "Гибкие условия доставки",
        "description": "Мы предлагаем удобные варианты доставки, включая возможность выбора времени и места, что позволяет вам сосредоточиться на важном."
    },
    {
        "title": "Разнообразное меню",
        "description": "Наше меню включает блюда разных кухонь мира, что удовлетворит вкусы всех сотрудников вашей компании."
    },
    {
        "title": "Конкурентные цены",
        "description": "Мы предлагаем привлекательные цены для корпоративных клиентов, что позволяет оптимизировать бюджет вашей компании."
    },
    {
        "title": "Опытная команда",
        "description": "Наша команда профессионалов имеет большой опыт в организации корпоративного питания и всегда готова помочь."
    }
]

// export const KCards = (item) => {
//     const windowWidth=useWindowWidth()
//     const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
//     const ref = useRef(null)
//     const isInView = useInView(ref,{once:true,margin: "0px 0px -200px 0px"})
//     const {scrollYProgress}=useScroll({target:ref})
//     const translateX = useTransform(scrollYProgress, [0,1], ["1%", "-80%"])
//     const controls = useAnimation()
//     useEffect(()=>{
//         if (isInView){
//             controls.start("animate")
//         }
//       },[isInView])
//     return(
//         <section  className="w-screen xl:max-w-screen-xl self-center px-4  ">
//             <Wrap>
//                 <h2 className="text-white bg-violet-300 py-2 font-bold text-6xl sm:text-7xl text-center ">Почему мы?</h2>    
//             </Wrap> 
//             <Wrap>
//                 <div ref={ref} className=" h-[300vh] sm:h-[400vh] ">
//                 <motion.div  
//                     initial={{
//                         x:"100%"
//                     }}
//                     animate={{
//                         x:"0%"
//                     }}
//                     transition={{ease:"easeInOut"}}
//                     className=" sticky top-0 flex h-screen items-center overflow-hidden" style={{translateX}}>
//                     <div className="flex gap-60 sm:gap-96 " >
//                         {value.map((item,index)=>(
//                             <Card key={index} item={item} index={index}></Card>
//                         ))}
//                     </div>
//                 </motion.div>     
//                 </div>
//             </Wrap>
            
            
//         </section>
//     )
// }                                 

// const Card = ({item, index}) => {
//     console.log(item)
//     return(
//         <div className="relative w-[500px] sm:w-[600px] aspect-square border-2 border-black rounded-md p-5">
//             <div className="flex flex-col h-full justify-between  gap-4">
//               <span className="text-7xl text-violet-300 font-extrabold">0{index+1}</span>
//               <h1 className='text-2xl sm:text-4xl font-bold text-secondary'>{item.description}</h1>
//             </div>
//         </div>
//     )    
// }
import { motion, useTransform, useScroll, animate, useMotionValue, useMotionTemplate } from "framer-motion";

import { FC, useEffect, useRef } from "react";

interface ICard{
  url:string,
  title:string,
  id:number,
}

interface value{
  card:ICard,
  index:number,
}

const COLORS_TOP = ["#FF6F61", "#FF4E50", "#FF3B30", "#FF9AA2", "#FF2D55", "#FF007A"];



export const KCards = () => {

  return (

    <div className="relative bg-neutral-800 border-t-neutral-700 border-t-2">

      <HorizontalScrollCarousel />

    </div>

  );

};


const HorizontalScrollCarousel = () => {

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({

    target: targetRef,

  });


  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-95%"]);


  return (

    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        <motion.div style={{ x }} className="flex gap-96">

          {value.map((card,index) => {

            return <Card card={card} index={index} />;

          })}

        </motion.div>

      </div>

    </section>

  );

};

const Card:FC<value> = ({card,index}) => {
    console.log(index)
    return(
        <div className="relative w-[100vw] sm:w-[600px] aspect-square border-2 border-yellow rounded-md p-5">
            <div className="flex flex-col h-full justify-between  gap-4">
              <span className="text-6xl sm:text-8xl text-yellow font-extrabold">0{index+1}</span>
              <h1 className='text-2xl sm:text-4xl font-bold text-[#DEDCDF]'>{card.description}</h1>
            </div>
        </div>
    )    
}

const cards = [

  {

    url: "/imgs/abstract/1.jpg",

    title: "Title 1",

    id: 1,

  },

  {

    url: "/imgs/abstract/2.jpg",

    title: "Title 2",

    id: 2,

  },

  {

    url: "/imgs/abstract/3.jpg",

    title: "Title 3",

    id: 3,

  },

  {

    url: "/imgs/abstract/4.jpg",

    title: "Title 4",

    id: 4,

  },

  {

    url: "/imgs/abstract/5.jpg",

    title: "Title 5",

    id: 5,

  },

  {

    url: "/imgs/abstract/6.jpg",

    title: "Title 6",

    id: 6,

  },

  {

    url: "/imgs/abstract/7.jpg",

    title: "Title 7",

    id: 7,

  },

];