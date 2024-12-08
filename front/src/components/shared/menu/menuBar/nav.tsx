import { Context } from "@/app/layout"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, useContext, useEffect, useState } from "react"
import { ADelButton, AEditButton } from "../admin-tools/tools"
import { motion } from "framer-motion"

interface ICategories{
    categories: ICat[]
}

interface ICat{
    id:number,
    link:string,
    name:string,
  }

export const MenuNav:FC<ICategories> = (categories) => {
    const [active,setActive]=useState<number| string | null>(null)
    const path = usePathname()

    const {store} = useContext(Context)
    return (
        <div className={`flex gap-5 w-full pt-7`}>
            {categories.categories.map((category,index) => {  
                useEffect(() => {
                    if (path=="/"){
                        setActive(null)
                    }
                    else{
                        var pathsplit = path.split('/')
                        setActive(pathsplit[pathsplit.length-1])
                    }
                }, [path])
                return (
                <div key={index}>
                    {category.link && (
                        <div className="flex">
                            <Link
                              key={index}
                              className={`relative flex px-3 py-2 rounded-lg ${active === category.link ? ' ' : ''}`}
                              href={`/category/${category.link.toLowerCase()}`}
                            >
                              {active === category.link && (
                                <motion.span layoutId="underline"  className="absolute left-0 right-0 h-0.5 bg-black bottom-0" />
                              )}
                              <button className="relative z-10">
                                <span className={`text-xl font-semibold text-secondary h-full `}> {category.name}</span>
                              </button>
                            </Link>

                            {store.isAuth&&store.user.adm?(
                                <div className="flex">
                                    <ADelButton id={category.id} color={"text-black"}/>
                                    <AEditButton id={category.id} color={"text-black"} type="cat"/>     
                                </div>
                                ):(
                                    null
                                )}
                        </div >
                        
                    )}
                </div>
            )})} 
            {store.isAuth&&store.user.adm&&
                <Link className="text-xl self-center font-medium" href={"/admin/menu-off-the-day"}>Меню дня</Link>
            }           
        </div>
    )
}