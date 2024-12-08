'use client'
import React, { useEffect, useRef } from 'react';
import {Card} from '@/components/shared/korp/card-section/card'
import {CardSection} from '@/components/shared/korp/card-section/section'
import {SectionTwo} from '@/components/shared/korp/contact-section/section'
import {MapSection} from '@/components/shared/korp/map-section/section'
import {MenuSection} from '@/components/shared/korp/menu-section/section'
import { Hero } from '@/components/shared/korp/hero';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import AnimatedGrid from '@/components/shared/korp/background';
import { Gallery } from '@/components/shared/korp/gallery';
import Contact from '@/components/shared/korp/contact';
import { History } from '@/components/shared/korp/history';
import { Procces } from '@/components/shared/korp/process';
import { Menu } from '@/components/shared/korp/menu';
import { KCards } from '@/components/shared/korp/info-card';

import { Images } from '@/components/shared/korp/images';
import { CorporativeHero } from '@/components/shared/korp/CorporativeHero';




function Corporative({
  children
}: Readonly<{
  children: React.ReactNode}>) {
  // useEffect( () => {

  //   const lenis = new Lenis()


  //   const raf = (time:number) => {

  //     lenis.raf(time)

  //     requestAnimationFrame(raf)

  //   }


  //   requestAnimationFrame(raf)

  // }, [])
  return (
  <div className="w-screen min-h-screen flex flex-col justify-center" > 
    <CorporativeHero/>
    {/* <CardSection/>
    <Gallery/>
    <Contact/> */}
    <KCards/>
    <Menu/>
    <History/>
  </div>
  )
}

export default Corporative;