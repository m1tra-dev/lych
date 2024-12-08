import Link from "next/link";
import { FC } from "react";

export const NotFound:FC = () => {
    return (
        <main className="w-full h-full flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
                <h1 className='border-r-2 p-2'>Error 404</h1>
                <h2 className='p-2'>This page could not be found!</h2>
            </div>
            <Link className='Back-home-btn' href='/'>
                <button className='border-2 m-2 p-1 border-black rounded- '>home page</button>
            </Link>
            
        </main>
    )
}