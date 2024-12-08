import { observer } from "mobx-react-lite";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useContext, useEffect } from "react";
import { Context } from "@/app/layout";
import { useTransform, motion, useScroll } from 'framer-motion';
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

export const Layout=observer(({
  children
}: Readonly<{
  children: React.ReactNode}>)=> {
  const {store}=useContext(Context)
  useEffect(()=>{
    if (localStorage.getItem('token')){
      console.log('check')
      store.checkAuth()
    }

  },[])
  // useEffect( () => {

  //   const lenis = new Lenis()


  //   const raf = (time:number) => {

  //     lenis.raf(time)

  //     requestAnimationFrame(raf)

  //   }


  //   requestAnimationFrame(raf)

  // }, [])
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const {scrollY} = useScroll()
  // const offsetY=[0,300]
  // const marginTop = useTransform(scrollY,offsetY,[100,isMobile?100:80])
  return (
    <div className="flex  min-h-screen justify-center"> 
      <Header />
      <div className="flex flex-col w-full">
        <motion.main 
          style={{marginTop:96}}
          className=" w-full flex justify-center flex-grow ">
            {children}
        </motion.main>
        <Footer/>
      </div>
      
    </div>
  );
})