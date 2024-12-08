import { AnimatePresence, motion, transform, useAnimation } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { Wrap } from './wrapper';
import { Typewrite } from './typing';
import { SectionTwo } from './contact-section/section';
import { icons } from './data';
import { Instagram, Phone, Twitch, Twitter } from 'lucide-react';

import { width } from '@fortawesome/free-brands-svg-icons/faTelegram';
interface IBg {
    children: React.ReactNode,
    onClick: () => void;
    disabled?: boolean;
    style?: string;
  }

const SocialButton:FC = (item) => {
    const ref = useRef(null)
    const [isHovered, setIsHovered] = useState(false);    
    const controls = useAnimation()
    const icoControls = useAnimation()
    useEffect(()=>{
        if (isHovered){
          controls.start("visible")
          icoControls.start("hidden")
        }
        else{
            controls.start("hidden")
            icoControls.start("visible")
        }
      },[isHovered])  
    return(
            <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className=" z-10"
                ref={ref}
            >   
                <AnimatePresence>
                    <motion.div   
                        variants={{
                          hidden:{width:"80px",height:"80px"},
                          visible:{width:"240px",height:'160px'}
                        }} 
                        initial="hidden"
                        animate={controls}
                        transition={{duration:0.3}}
                        exit={{width:0, height:0}} className='bg-violet-300 overflow-hidden relative border-2 p-2 rounded-md border-black flex justify-center items-center'
                        >
                        <motion.div
                            variants={{
                                hidden:{opacity:0},
                                visible:{opacity:1}
                            }} 
                            initial="visible"
                            animate={icoControls}
                            transition={{duration:isHovered?0.1:0.3}}
                        >
                            <Phone size={35} strokeWidth={1.5}/>
                        </motion.div>
                        <div className='absolute w-full h-full  '>
                            <motion.div
                                variants={{
                                    hidden:{opacity:0},
                                    visible:{opacity:1}
                                }} 
                                initial="hidden"
                                animate={controls}
                                transition={{duration:isHovered?0.5:0.1,delay:isHovered?0.3:0}}
                                className=' grid grid-cols-3 justify-center items-center w-full h-full'
                            >
                                <div className='flex flex-col items-center  hover:scale-125 transition duration-300'>
                                    <Instagram size={40} strokeWidth={1.5}/>
                                </div>
                                <div className='flex flex-col items-center hover:scale-125 transition duration-300'>
                                    <Twitch size={40} strokeWidth={1.5} />
                                </div>
                                <div className='flex flex-col items-center hover:scale-125 transition duration-300'>
                                    <Twitter size={40} strokeWidth={1.5} />
                                </div>
                                <div className='flex flex-col items-center hover:scale-125 transition duration-300'>
                                    <Instagram size={40} strokeWidth={1.5} />
                                </div>
                                <div className='flex flex-col items-center hover:scale-125 transition duration-300'>
                                    <Twitch size={40} strokeWidth={1.5} />
                                </div>
                                <div className='flex flex-col items-center hover:scale-125 transition duration-300'>
                                    <Twitter size={40} strokeWidth={1.5} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>     
            </div>
    
    )
}

const Contact:FC<IBg> = ({children}) => {

    return (
        <section className='h-screen'>
            <Wrap>  
                <h2 className="text-secondary text-3xl text-center font-semibold">Наши контакты</h2>
            </Wrap>  
            <div className='flex py-20 gap-20'>
                <Wrap>   
                    <motion.iframe className="" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5af44070ec2c3c6e67093306af1e33d7055c9be656bd1a89696e2833cc36bcda&amp;source=constructor" width="695" height="695" ></motion.iframe>          
                </Wrap> 
                <div className='flex flex-col justify-between py-10'>
                    <Wrap> 
                        <motion.p className='text-secondary text-xl text-start font-medium'>Мы рады приветствовать вас в нашем ресторане! Чтобы сделать ваше посещение максимально удобным, мы предоставляем карту с точным местоположением. </motion.p>
                    </Wrap> 
                    <div className='flex flex-col gap-2'> 
                        <Wrap> 
                            <div className='w-full flex'>
                                <span className='text-secondary text-xl text-start font-medium'>Наш адрес:{'\u00A0'}</span><Typewrite examples={[
                                    "Есть ли возможность заказать пробное меню перед большим мероприятием?",
                                    "Как происходит возврат или обмен товаров в случае недовольства?",
                                    "Какие меры безопасности и гигиены вы принимаете при приготовлении и доставке еды?",
                                    "В чём смысл жизни?",
                                    ]}/>
                            </div> 
                        </Wrap> 
                        <Wrap> 
                            <p className='text-secondary text-2xl text-start font-medium'>Наши социальные сети </p>
                        </Wrap> 
                        <Wrap> 
                            <SocialButton></SocialButton>
                        </Wrap>  
                    </div>
                </div> 
            </div>
        </section>
    )
}

export default Contact;
   