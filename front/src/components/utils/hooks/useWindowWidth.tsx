import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // Состояние для хранения ширины окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Функция для обновления ширины окна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем обработчик события resize
    window.addEventListener('resize', handleResize);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
};

export default useWindowWidth;