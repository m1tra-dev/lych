import useWindowHeight from '@/components/utils/hooks/useWindowHeight';
import { motion, transform, useAnimation, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChartNoAxesCombined, FileChartPie, FileSliders, Handshake, MessageCircleMore, PanelsTopLeft, SearchCheck, UserRoundPen } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';


interface IBg {
    children: React.ReactNode,
  }

const value = [
    {
      "ico":<UserRoundPen />,
      "title": "Первичный контакт",
      "description": "Свяжитесь с нами через наш сайт, по телефону или электронной почте. Мы готовы ответить на все ваши вопросы и обсудить ваши потребности."
    },
    {
      "ico":<MessageCircleMore />,
      "title": "Консультация",
      "description": "Запланируем встречу (онлайн или оффлайн) для более детального обсуждения вашего бизнеса, целей и задач. На этом этапе мы также расскажем о наших услугах и подходах."
    },
    {
     "ico":<ChartNoAxesCombined />,
     "title": "Анализ потребностей",
     "description": "Мы проведем анализ вашей текущей ситуации, чтобы понять, какие решения будут наиболее эффективными. Это может включать в себя изучение ваших процессов, конкурентов и рынка."
    },
    {
      "ico":<FileSliders />,
      "title": "Разработка предложения",
      "description": "На основе анализа мы подготовим индивидуальное предложение, включающее рекомендации, сроки и стоимость услуг. Вы получите четкое представление о том, как мы можем помочь вашему бизнесу."
    },
    {
      "ico":<SearchCheck />,
      "title": "Обсуждение и корректировка",
      "description": "Мы обсудим наше предложение с вами, внесем необходимые изменения и уточнения. Важно, чтобы все аспекты сотрудничества соответствовали вашим ожиданиям."
    },
    {
      "ico":<Handshake />,
      "title": "Заключение договора",
      "description": "После согласования всех деталей мы заключим договор, который будет защищать интересы обеих сторон."
    },
    {
      "ico":<PanelsTopLeft />,
      "title": "Запуск проекта",
      "description": "Начнем реализацию согласованных решений. Мы будем поддерживать постоянную связь с вами на всех этапах работы."
    },
    {
      "ico":<FileChartPie />,
      "title": "Мониторинг и оценка результатов",
      "description": "После запуска проекта мы будем регулярно отслеживать его результаты и вносить корректировки при необходимости. Ваши отзывы важны для нас!"
    }
]

export const Procces = () => {
    const ref = useRef(null)
    const { scrollY } = useScroll();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const windowHeight=useWindowHeight()
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 640); // 640px - это ширина для sm в Tailwind
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Проверяем сразу при монтировании
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    // Определяем массив блоков
    const blocks = ['Block 1', 'Block 2', 'Block 3', 'Block 4'];
    return (
  //     <motion.div className="justify-center px-4 border-[5px] border-black  h-[450vh] flex w-full  xl:flex-row xl:w-[1280px] self-center " ref={ref} id='card'>
        
  //       <div className="sticky top-0 h-screen self-start border-[5px] border-red-500 w-full xl:w-1/2">
  //   <div className='absolute top-28 xl:top-1/2 xl:-translate-y-1/2 w-full aspect-square border-2 border-black rounded-lg p-4'>
  //     <span className="text-xl text-white bg-violet-300 p-2">Talks</span>
  //     <h1 className="text-7xl font-bold text-white bg-violet-300 p-2 text-start">Explore the</h1>
  //     <span className="text-7xl font-bold text-white bg-violet-300 p-2 text-center">agenda</span>
  //   </div>
  // </div>
  //       <div className="sticky h-screen top-0 self-start w-full xl:top-0 xl:w-1/2 border-[5px] border-blue-500">
  //           <div className='absolute bottom-0 xl:top-1/2 xl:-translate-y-1/2  w-full aspect-square  '>
  //             {value.map((item, index) => {
  //               // Применяем анимацию к каждому блоку
  //               const start = 4800+index * 400; // Начало анимации
  //               const end = 4800+(index + 1) * 400; // Конец анимации
  //               const y = useSpring(useTransform(scrollY, [start, end], [600,0]), {
  //                 stiffness: 100,
  //                 damping: 20,
  //               });
  //               const height = useSpring(useTransform(scrollY, [start, end], [400, 100]), {
  //                 stiffness: 100,
  //                 damping: 20,
  //               });
  //               const opacity = useTransform(scrollY, [start, end], [0, 1]);
              
  //               return (
  //                 <>
  //                 <motion.div
  //                   key={index}
  //                   className="absolute w-full xl:h-2/3 h-40 border-2 border-black rounded-lg bg-white p-5"
  //                   style={{
  //                     y,
  //                     opacity,
  //                     marginTop: index === 0 || isSmallScreen ? 0 : `${20 * index}px`,
  //                   }}
  //                 >
                    
  //                   <div className="flex items-center gap-4">
  //                     <span className="text-5xl text-violet-300 font-bold">0{index+1}</span>
  //                     <h1 className='text-3xl font-bold text-secondary'>{item.title}</h1>
  //                   </div>
  //                   <p className='hidden xl:flex text-xl pt-4 text-secondary'>{item.description}</p>
                    
  //                 </motion.div>
  //                 {index==value.length-1&&<motion.button className='px-5 py-2.5 border-2 border-black absolute bottom-0 w-full text-2xl rounded-3xl font-bold' style={{opacity,y}}>CONTACT</motion.button>}
  //                 </>
  //               );
  //             })}
  //           </div>
  //         </div>
  //     </motion.div>
<div className="px-5 h-[480vh] relative">
  <div className='sticky top-5 left-0 w-full flex items-center justify-center xl:h-svh overflow-hidden'>
    <div className='relative items-stretch flex flex-col xl:flex-row gap-2 xl:gap-0 justify-center w-[1280px] h-[640px]'>
      <div className='w-full xl:w-1/2 h-[80%] xl:h-full border-2 border-black rounded-2xl p-4 '>
        <span className="text-xl text-white  p-2">Talks</span>
        <h1 className="text-7xl font-bold text-white bg-violet-300 p-2 text-start">Explore the</h1>
        <span className="text-7xl font-bold text-white bg-violet-300 p-2 text-center">agenda</span>
      </div>
      <div className='relative w-full xl:w-1/2 h-[20%] xl:h-full rounded-2xl'>
      {value.map((item, index) => {
                // Применяем анимацию к каждому блоку
                const start = windowHeight*5+index * 400; // Начало анимации
                const end = windowHeight*5+(index + 1) * 400; // Конец анимации
                const y = useSpring(useTransform(scrollY, [start, end], [600,0]), {
                  stiffness: 100,
                  damping: 20,
                });
                const height = useSpring(useTransform(scrollY, [start, end], [400, 100]), {
                  stiffness: 100,
                  damping: 20,
                });
                const opacity = useTransform(scrollY, [start, end], [0, 1]);
              
                return (
                  <>
                  <motion.div
                    key={index}
                    className="absolute w-full xl:h-2/3 h-[110px] border-2 border-black rounded-lg bg-white p-5"
                    style={{
                      y,
                      opacity,
                      marginTop: index === 0 || isSmallScreen ? 0 : `${20 * index}px`,
                    }}
                  >
                    
                    <div className="flex items-center gap-4">
                      <span className="text-5xl text-violet-300 font-bold">0{index+1}</span>
                      <h1 className='text-3xl font-bold text-secondary'>{item.title}</h1>
                    </div>
                    <p className='hidden xl:flex text-xl pt-4 text-secondary'>{item.description}</p>
                    
                  </motion.div>
                  {index==value.length-1&&<motion.button className='px-5 py-2.5 border-2 border-black absolute bottom-0 w-full text-2xl rounded-3xl font-bold' style={{opacity,y}}>CONTACT</motion.button>}
                  </>
                );
              })}
      </div>
    </div>
  </div>
</div>




    );
  };

    