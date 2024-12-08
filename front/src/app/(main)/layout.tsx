'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";


import { Suspense, createContext, useEffect } from "react";
import { Layout } from "@/components/shared/layout/_layout";



const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode}>) {
  return (
    
    <Layout children={children}/>
  );
}
