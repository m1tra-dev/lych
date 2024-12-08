import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import React, { FC, useEffect, useRef } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';


interface IWrapper{
  children: React.ReactNode,
  className: string,
  speed: number,
  id?: string,
}

export const ParallaxWrap:FC<IWrapper> = ({children,className,speed=1,id="paralax"}) => {
  const trigger = useRef(null);
  const target = useRef(null);
  const timeline = useRef();


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const y = window.innerWidth * speed * 0.1

    const setY = gsap.quickSetter(target.current,"y", "px")

    timeline.current = gsap.timeline({
      scrollTrigger:{
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          setY(e.progress * y)
        }
      }
    })
    return () => {
      timeline?.current.kill()
    }
  }, [id,speed,window.innerWidth])
  

  return (
    <div ref={trigger} className={className} >
      <div ref={target}>
        {children}
      </div>
    </div>
  )
}