'use client'
import Link from "next/link"
import { useEffect, useState } from "react";
import { Api } from "../../../../../services/api-client";
import { usePathname } from "next/navigation";


const Info = () => {
    const [product, setProduct] = useState({});
    const path = usePathname().split('/')
    
    useEffect(()=>{
        Api.products.info(path[path.length-1]).then(items => {
            setProduct(items)
        })
    },[]) 
 
    return (
        <>
           <p>{product.name}</p>
        </>
    )
}

export default Info