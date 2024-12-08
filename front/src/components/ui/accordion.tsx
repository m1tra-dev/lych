import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import React, { FC, useState } from 'react'


interface AccordionProps {
    value: { title: string; description: string }[];
}

export const Accordion: FC<AccordionProps> = ({ value }) => {
    const [isVisible, setIsVisible] = useState(Array(value.length).fill(false));

    const handleIsVisible = (key: number) => {
        setIsVisible(prev => {
            const newVisibility = [...prev];
            newVisibility[key] = !newVisibility[key];
            return newVisibility;
        });
    };

    return (
        <div className='w-full relative'>
            {value.map((item, index) => (
                <div key={index}>
                    <button
                        className='w-full py-8 border-t border-gray-300    z-10 relative '
                        onClick={() => handleIsVisible(index)}
                    >
                        <h3 className={` text-start font-semibold text-lg mr-5 ${isVisible[index]&&' transition-colors duration-300'}`}>{item.title}</h3>
                        <ChevronUp className={`${isVisible[index]&&'text-yellow rotate-180'} absolute top-1/2 -translate-y-1/2 right-0 transition-all duration-300   `} />
                    </button> 
                        <AnimatePresence>
                            {isVisible[index] && (
                                <motion.div
                                    layout
                                    initial={{ height: 0 }}
                                    animate={{ height: isVisible[index] ? "auto" : 0 }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='overflow-hidden text-start text-gray-600 bg-white  '
                                >
                                    {item.description}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    
                </div>
            ))}
        </div>
    );
};