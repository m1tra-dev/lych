import { motion } from "framer-motion";
import { CircleCheck, CircleX, X } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface AlertProps {
    children: React.ReactNode;
    onClick:()=>void;
  }

export const SuccessAlert:FC<AlertProps> = ({
    children,
    onClick,
    }
    ) => {
    return (
        <div className={`flex rounded-md bg-green-100 p-4 text-sm text-green-500`} x-cloak x-show="showAlert" x-data="{ showAlert: true }">
            <CircleCheck size={28} strokeWidth={2.25} className="mr-2"/>
            <div>
              <h4 className="font-bold">Оповещение об успехе</h4>
              <div className="mt-1">{children}</div>
              <div className="mt-2 flex space-x-4">
                <Link className="inline-block font-bold leading-loose" href="/">Вернуться в меню</Link>
                <button className="inline-block font-bold leading-loose" onClick={onClick}>Закрыть</button>
              </div>
            </div>
        </div> 
    );
  };
export const ErrorAlert:FC<AlertProps> = ({
  children,
  onClick,
  }
  ) => {
  return (
      <div className={`flex rounded-md bg-red-100 p-4 text-sm text-red-500`} x-cloak x-show="showAlert" x-data="{ showAlert: true }">
          <CircleX size={28} strokeWidth={2.25} className='mr-2'/>
          <div>
            <h4 className="font-bold">Ошибка</h4>
            <div className="mt-1">{children}</div>
            <div className="mt-2 flex space-x-4">
              <Link className="inline-block font-bold leading-loose" href="/">Вернуться в меню</Link>
              <button className="inline-block font-bold leading-loose" onClick={onClick}>Закрыть</button>
            </div>
          </div>
      </div> 
  );
};
interface ErrorNotificationProps {
  message: string;
  duration?: number; // duration in milliseconds
}

// components/ErrorNotification.tsx




interface NotificationProps {
  children: React.ReactNode;
  duration?: number; // Длительность в миллисекундах
  onClose: () => void;
}



export const NotificationUi: React.FC<NotificationProps> = ({ children, duration = 8000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true); // Сбрасываем видимость, когда приходит новое уведомление
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="relative bg-gray-400 text-white p-4 rounded-lg shadow-md w-72 overflow-hidden h-20 flex flex-col justify-center items-center">
      {children}
      {/* Добавляем уникальный ключ (например, duration) для перезагрузки анимации при каждом новом вызове */}
      <X className="absolute top-0 right-0 m-2" onClick={()=>setVisible(false)}/>
      <motion.div
        key={Date.now()} // Используем текущее время как уникальный ключ
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000 }} // Преобразование миллисекунд в секунды
        className="absolute bottom-0 left-0 h-1 bg-gray-300"
      />        
    </div>
  );
};




