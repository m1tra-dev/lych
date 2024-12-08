'use client'
import { Cards } from "@/components/shared/about/Cards";
import { Contacts } from "@/components/shared/about/Contacts";
import { OurHistory } from "@/components/shared/about/OurHistory";

import { CardSection } from "@/components/shared/korp/card-section/section";
import Contact from "@/components/shared/korp/contact";
import { History } from '@/components/shared/korp/history';
import { Hero } from "@/components/shared/korp/hero";
import { Images } from "@/components/shared/korp/images";
import { KCards } from "@/components/shared/korp/info-card";
import { Procces } from "@/components/shared/korp/process";

function Corporative({
    children
  }: Readonly<{
    children: React.ReactNode}>) {
    return (
    <div className="w-screen min-h-screen flex flex-col justify-center" > 
      <Hero/>
      <Images/>
      <Procces/>
      <Contacts/>
      <History/>
    </div>
    )
  }
  
  export default Corporative;