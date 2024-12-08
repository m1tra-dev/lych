'use client'
import { ForkKnife, ForkKnifeCrossed, Link, Users } from 'lucide-react';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { BasketBtn } from '../header/basket-btn';
import { AuthBtn } from '../auth/authBtn';
import { UserBtn } from '../header/user-btn';
import Legal from './legal';
import Navbar from './navbar';
import Social from './social';
import Contact from './contact';

function Footer() {
  const path=usePathname()
  return (
    <footer className={` bg-[#141414] px-4 pt-12 text-neutral-100 md:flex-row border-box`} >
      <div className='mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-[1fr,_175px,_175px,_175px]'>
      <div className='flex justify-center items-center gap-5 justify-self-start self-start sm:self-center'>
        <ForkKnifeCrossed size={50} className='text-white'/>
        <span className='text-white text-xl'>Луч</span>
      </div>
      <div className='space-y-4 justify-self-start '>
        <Legal></Legal>
      </div>
      <div className='space-y-4 justify-self-start'>
        <Navbar></Navbar>
      </div>
      <div className='space-y-4 justify-self-start'>
        <Contact></Contact>
      </div>
      </div>
      <div className='-mx-4 mt-12 border-t-[1px] border-gray-500 p-4'>
        <div className='mx-auto flex max-w-6xl py-5 flex-col-reverse items-center justify-between gap-4 text-xs text-neutral-500 sm:flex-row'>
          <div className='text-gray-500'>© 2024 Луч. Все права защищены.</div>
          <div><Social></Social></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;