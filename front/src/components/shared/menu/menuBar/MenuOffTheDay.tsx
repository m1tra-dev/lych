import { Info, SlidersHorizontal } from "lucide-react";

const MenuOffTheDay = () => {


    return (
        <button className=" text-5xl  text-white py-2 pl-2  font-bold gap-2 px-2 bg-violet-300   flex items-center ">
           <span>Меню дня</span>
           <Info size={24} className="self-end"/>
        </button>
    );
};

export default MenuOffTheDay;