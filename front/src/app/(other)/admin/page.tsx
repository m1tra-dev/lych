'use client'
import { Context } from "@/app/layout";
import { useContext } from "react";
import { NotFound } from "@/components/ui";
import { Panel } from "@/components/shared/menu/admin-tools/tools";

function Homepage() {
    const {store} = useContext(Context)
    return (
        <div className="flex justify-center items-center w-full h-full">
        
            {store.isAuth&&store.user.adm?(
                <Panel/>
            ):(
                <NotFound/>
            )}
           
        </div>

  );
}

export default Homepage;