'use client'
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faVk} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FC } from "react";
// import { fetchCategories } from "../../../../../services/api/category";
import Link from "next/link";

export const MenuSection = () => {
    const [info,setInfo]=useState(false)
    const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //   async function getCategories() {
    //     const categories = await fetchCategories();
    //     setCategories(categories);
    //   }
    //   getCategories();
    // }, []);
    if (categories.length==0){
      return (
        <div>load...</div>
      )
    }
    return(
        <section>
            <h1 className="text-black text-2xl text-start m-4 font-medium">Коорпаративное меню</h1>
            <div className="flex">
                <nav className={`flex w-full mt-20`}>
                    <ul className='flex-col gap-20'>
                        {categories.map(category => (
                            <li key={category.id}>
                            {category.link && (
                                <Link className='menu-link' href={`/k-klient/${category.link.toLowerCase()}`}>
                                    <span className='text-3xl'> {category.name}</span>
                                </Link>
                            )}
                            </li>
                        ))}
                     </ul>
                </nav>
                
            </div>
        </section>
    )
}