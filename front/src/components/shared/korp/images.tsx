import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { ParallaxWrap } from './parallax'
import gsap from 'gsap';
import Img from '../../../../public/parallaxGalleryImages/fDSC01104.jpg'


export const Images = () => {
  const imageRef = useRef(null)
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true }); // Создаем таймлайн с бесконечным повтором
    timeline.to(imageRef.current, {  duration: 1 }); // Увеличиваем изображение
    timeline.to(imageRef.current, {  duration: 1 }); // Возвращаем его в исходное состояние
}, []);
  return (
    <div className='py-20 flex flex-col gap-10  px-5 '> 
        <ParallaxWrap className='self-start' speed={1} >
            <Image ref={imageRef} src={'/parallaxGalleryImages/fDSC01077.jpg'} alt='smooth scroll' width={600} height={400}  className='shadow-lg  shadow-red-200'/>
        </ParallaxWrap>
        <ParallaxWrap className='self-center' speed={3} >
            <Image src={"/parallaxGalleryImages/fDSC01085.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-end' speed={-2} >
            <Image src={"/parallaxGalleryImages/fDSC01086.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-start' speed={1.5} >
            <Image src={"/parallaxGalleryImages/fDSC01090.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-center' speed={-4} >
            <Image src={"/parallaxGalleryImages/fDSC01090.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-end' speed={2.2} >
            <Image src={"/parallaxGalleryImages/fDSC01094.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-start' speed={-1} >
            <Image src={"/parallaxGalleryImages/fDSC01098.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-center' speed={2} >
            <Image src={"/parallaxGalleryImages/fDSC01114.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
        <ParallaxWrap className='self-end' speed={-1.3} >
            <Image src={"/parallaxGalleryImages/fDSC01112.jpg"} alt='smooth scroll' width={600} height={400} className=''/>
        </ParallaxWrap>
    </div>
  )
}

