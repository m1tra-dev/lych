'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/shared/layout/_layout";
import MenuNavBar from "@/components/shared/menu/menuBar/menuNavBar";
import MenuOffTheDay from "@/components/shared/menu/menuBar/MenuOffTheDay";
import { Info } from "lucide-react";
import Link from "next/link";




const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    
    <Layout>
        {modal}
        <div className='inline-flex flex-col h-full justify-start w-[1280px]'>
            <div className="flex justify-between items-center mt-5 ">
              <div className="text-5xl  text-white py-2  font-bold gap-2 px-2 bg-violet-300   flex items-center relative">
                <span>Меню</span>
              </div>
            </div>
            <MenuNavBar>
              {children}
            </MenuNavBar>
            
        </div>
    </Layout>   
    );
}
