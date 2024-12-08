'use client'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FC } from "react";

export const SectionThree:FC = (item) => {
    const [info,setInfo]=useState(false)
    return(
        <section>
            <h1 className="text-black text-2xl text-start m-4 font-medium">Варианты услуг</h1>
            <p className="text-primary mt-2 text-center text-lg">Расширение возожностей для корпоративных клиентов</p>           
             
        </section>
    )
}