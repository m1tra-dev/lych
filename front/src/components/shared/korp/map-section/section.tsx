'use client'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FC } from "react";
import { motion } from "framer-motion";

export const MapSection:FC = (item) => {
    const [info,setInfo]=useState(false)
    const textAnimation = {
        hidden: {
            y:100,
            opacity: 0,
        },
        visible: (custom:number) => ({
            y:0,
            opacity:1,
            transition:{delay:custom*0.2},
        })
    }
    return(
        <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{amount:0.2}}
        className="">
            <motion.h1 custom={1} variants={textAnimation} className="text-black text-2xl text-start m-10 font-medium">Наши кооринаты</motion.h1>
            <motion.iframe custom={2} variants={textAnimation} className="m-15" src="https://yandex.ru/map-widget/v1/?um=constructor%3A5af44070ec2c3c6e67093306af1e33d7055c9be656bd1a89696e2833cc36bcda&amp;source=constructor" width="695" height="499" ></motion.iframe>
        </motion.section>
    )
}