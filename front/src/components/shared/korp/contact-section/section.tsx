'use client'
import { useState } from "react"
import { FC } from "react"
import {SocialButton} from './button'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import { motion } from "framer-motion";

export const SectionTwo:FC = () =>{
    const icons = [
        {
            href:'',
            ico:faPhone,
            color:'group-hover:bg-phoneDark',
            description:'Для оперативной связи с нами по вопросам продуктов, услуг или технической поддержки, пожалуйста, звоните по указанному номеру.',
            colorIco:'group-hover:text-phoneDark',
            colorBg:'bg-phoneLight'
            
        },
        {
            href:'',
            ico:faTelegram,
            color:'group-hover:bg-tg',
            description:'Подписывайтесь на наш телеграм канал, чтобы быть в курсе последних новостей, акций и мероприятий компании, а также получать полезную информацию о продуктах и услугах.',
            colorIco:'group-hover:text-tg',
            colorBg:'bg-tgLight'
            },
        {
            href:'',
            ico:faVk,
            color:'group-hover:bg-vk',
            description:'Присоединяйтесь к нашей группе в социальной сети ВКонтакте, чтобы общаться с другими клиентами, задавать вопросы и получать обратную связь от нашей команды.',
            colorIco:'group-hover:text-vk',
            colorBg:'bg-vkLight'
            }]
        const textAnimation = {
            hidden: {
                y:50,
                opacity: 0,
            },
            visible: (custom:number) => ({
                y:0,
                opacity:100,
                transition:{delay:custom*0.2},
            })
        }
    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{amount:0.2}} 
            className=' w-full '>
            <motion.h1 custom={1} variants={textAnimation} className="text-black text-2xl text-start m-10 font-medium">Наши социальные сети</motion.h1>
            <ul className="flex w-full gap-5">
            {icons.map((item,index)=>(
                <motion.li 
                    key={index}
                    custom={index+2} 
                    variants={textAnimation} 
                    className="group hover:w-full transition-all delay-300 w-20 max-h-20 relative group"
                    >
                        <SocialButton {...item}/>
                </motion.li>
            ))}
            </ul>
            <p></p>
            
        </motion.section>
    )
}