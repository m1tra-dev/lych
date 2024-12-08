'use client'

import { Inter } from "next/font/google";
import './globals.css'

import Store from '@/store/store' 

import { Suspense, createContext, useEffect } from "react";
import { Layout } from "@/components/shared/layout/_layout";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";




const inter = Inter({ subsets: ["latin"] });
const store = new Store()

export const Context = createContext({store})


export default function RootLayout({
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
    <Context.Provider value={{store}}>
    <html lang="en" className="h-full select-none">
      <body className="h-full box-border overflow-x-hidden">
        <AnimatePresence>
          {children}
        </AnimatePresence>
      </body>
    </html>
    </Context.Provider>
  );
}
