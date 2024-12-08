'use client'
// import './header.css';
import React, { useState,useRef, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Context } from '@/app/layout';
import { LogOut, User } from '../user/user';
import { observer } from 'mobx-react-lite';
import {Button} from '../../ui/index';
import Image from 'next/image'
import { Carrot, Handshake, Instagram, LogIn, Phone, ShoppingCart, Trash, Twitter, UserRound, Users, UtensilsCrossed, Youtube } from 'lucide-react';
import { BasketBtn } from './basket-btn';
import { AuthBtn } from '@/components/shared/auth/authBtn';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { TransitionLink } from '@/components/utils/TransitionLink';
import { useMediaQuery } from 'react-responsive';
import useWindowWidth from '@/components/utils/hooks/useWindowWidth';
import Link from 'next/link';

const value=[
  {
    "title": "О нас",
    "href":"/about"
  },
  {
    "title": "Корпоративным клиентам",
    "href":"/k-client"
  },
  {
    "title": "Войти",
    "href":""
  },
]

const Header=()=> {
  const headerRef = useRef<HTMLDivElement> (null!);

  const windowWidth=useWindowWidth()

  const path=usePathname()
  const user=useContext(Context)
  const {scrollY} = useScroll()

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isNotXl = useMediaQuery({ query: '(max-width: 1280px)' });

  const [showPanel,setShowPanel]=useState(false)

  const handleShow=(val?:boolean)=>{
    setShowPanel(val)
  }

  const offsetY=[0,100]
  const height = useSpring(useTransform(scrollY, offsetY, [isMobile?80:70, isMobile?80:50]), {
    stiffness: 100,
    damping: 20,
  });



  const width = useSpring(useTransform(scrollY, offsetY, [isNotXl?windowWidth:1280, isMobile?windowWidth:400]), {
    stiffness: 100,
    damping: 20,
  });


  const right = useSpring(useTransform(scrollY, offsetY, [0,15]), {
    stiffness: 100,
    damping: 20,
  });
  const scale = useSpring(useTransform(scrollY, offsetY, [1,0.9]), {
    stiffness: 100,
    damping: 20,
  });
  const paddingLeft = useSpring(useTransform(scrollY, offsetY, [32,0]), {
    stiffness: 100,
    damping: 20,
  });

  const opacity_text = useSpring(useTransform(scrollY, [0, 1], [1, 0]), {
    stiffness: 100,
    damping: 10,})
  const display_text = useTransform(scrollY, [0, 1], ['block', 'none'])
  
  const opacity_ico = useSpring(useTransform(scrollY, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 10,})
  const display_ico = useTransform(scrollY, [0, 1], ['none', 'block'])
  
  const toggleMenu = () => {
    if (!headerRef.current.classList.contains('open')) {
      headerRef.current.classList.remove('close');
    } else {
      headerRef.current.classList.add('close');
    }
    headerRef.current.classList.toggle('open');
  };



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        headerRef.current.classList.remove('close');
        headerRef.current.classList.remove('open');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <motion.header 
      style={{
        
        borderRadius:20,
        // width:showPanel ? width : width,
        // height: height,

      }} 

      className={`hidden z-50 w-20 px-5 mt-3 max-w-7xl h-[70px] justify-self-center rounded-b-full sm:w-full fixed top-0    border-[#212121] bg-[#0d0d0de6]  md:flex header  items-center  justify-center  border-2 sm:border-top-0 sm:rounded-b-md border-b-2 sm:border-x-2  `} 
      ref={headerRef}> 

      <motion.div className=" items-center justify-between h-24 w-full max-w-screen-xl md:flex" >
        <div className=' justify-between w-full items-center h-full flex'>
          <div className='flex items-center'>
          <motion.div >
            <TransitionLink className={`${showPanel===true?'text-white delay-100':'text-black'} no-underline z-[110] transition-colors duration-300 `} href='/' >  
              <Image src={'/logo/logo2.svg'} width={100} height={60} alt=""/>
            </TransitionLink>
          </motion.div>
          <motion.nav className={`pl-8 hidden  group justify-self-start md:flex items-center gap-8 `}>
            <motion.div className='w-auto flex-col '>
              <TransitionLink href={'/about'} className='flex items-center'>
                <motion.span className=' text-[#DEDCDF]  hover:text-[#E5CB54]  py-3 whitespace-nowrap'>О нас</motion.span>
              </TransitionLink>
            </motion.div>
            <motion.div className='w-auto flex-col '>
              <TransitionLink href={'/k-client'} className='flex items-center'>
                <motion.span className=' text-[#DEDCDF] hover:text-[#E5CB54]  py-3 whitespace-nowrap'>Корпоративным клиентам</motion.span>
              </TransitionLink>
            </motion.div>
            <motion.div className='w-auto flex-col '>
              <motion.span className=' text-[#DEDCDF] hover:text-[#E5CB54]  py-3 whitespace-nowrap'>+7(911)281-23-23</motion.span>
            </motion.div>
          </motion.nav>
          </div>
          {/* <nav className='hidden justify-evenly w-full md:flex'>
            <motion.div style={{opacity:opacity_ico, display:display_ico}}>
              <TransitionLink href={'/about'}>
                <Users />
              </TransitionLink>
            </motion.div>
            <motion.div style={{opacity:opacity_ico, display:display_ico}}>
              <TransitionLink href={'/k-client'}>
                <Handshake  />
              </TransitionLink>
            </motion.div>
            <motion.div style={{opacity:opacity_ico, display:display_ico}}>
              <Phone />
            </motion.div>
          </nav> */}
          <motion.div  className=' mr-[65px] xl:mr-0'>
            {user.store.isAuth?<User/>:<AuthBtn/>}
          </motion.div>
        </div>    
      </motion.div>
      
      </motion.header>
      <div className='z-[100]  md:hidden ' >
        <AnimatePresence mode='wait'>
          <motion.div 
        
            initial={{ width: '40px',height: '40px',top:'20px',right:'25px',backgroundColor:'#fff' }}
            animate={{ width: showPanel ? '100vw' : '40px',height:showPanel ? '100vh' : '40px',top:showPanel ? '0' :'20px',right:showPanel ? '0' :'25px',backgroundColor:showPanel ? '#f8cb50 ' :'#fff' }}
            exit={{ width: '40px',height: '40px',top:'10px',right:'25px' }}
            transition={{ duration: 0.5 }}
            className={` fixed  h-full border-2 border-black rounded-lg  `}
          >
            
          </motion.div>
        </AnimatePresence>
        <motion.button
        
          onClick={()=>handleShow(!showPanel)} 
          transition={{ duration: 0.5 }}
          
          className={`group fixed right-[30px] top-[25px]   h-[30px] w-[30px] bg-white/0 transition-all  hover:bg-white/20 rounded-xl z-[110] `}>
          <span className={` rounded-lg w-full h-[4px] ${showPanel===true?'bg-black rotate-180':"bg-black"} transition-all duration-300 bg-black absolute top-1 left-0`}></span>
          <span className={` rounded-lg w-full h-[4px] ${showPanel===true?'bg-black rotate-180':"bg-black"} transition-all duration-300 bg-black absolute top-1/2 -translate-y-1/2 left-0`}></span>
          <span className={` rounded-lg w-1/2  h-[4px] ${showPanel===true?'bg-black rotate-180':"bg-black"} transition-all duration-300 bg-black absolute bottom-1 left-0`}></span>
        </motion.button>
        <AnimatePresence mode='wait'>
        {
            showPanel==true&&(

              <motion.div
                className='fixed right-0 top-0  h-[calc(100vh)] w-[100vw] overflow-hidden '>
                <motion.nav
                  initial={{opacity:1}}
                  exit={{opacity:0}}
                  className='flex flex-col text-4xl  text-black items-start justify-center h-full gap-10 p-5 '>
                    {value.map((val,index)=>(
                      <Link key={index} href={val.href} onClick={()=>handleShow(false)}>
                        <motion.span 
                          initial={{opacity:0}}
                          animate={{opacity:1}}
                          transition={{duration:0.2,delay: 0.5 + index * 0.2}}
                          className={`${index===1&&'self-start w-1/3'}`}>

                            {val.title}
                        </motion.span>
                      </Link>
                    ))}

                </motion.nav>
                <motion.nav 
                  initial={{opacity:1}}
                  exit={{opacity:0}}
                  className=' absolute bottom-0 p-5  text-black left-0'>
                  <motion.div className='flex gap-5'
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:0.2,delay: 1}}>
                    <Instagram />
                    <Twitter />
                    <Youtube />
                    <Phone />
                  </motion.div>
                </motion.nav>
              </motion.div>

            )
          }
        </AnimatePresence>
        </div>
        </>

  );
}

export default observer(Header);