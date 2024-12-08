import { useState, useEffect } from 'react';

const useWindowHeight = () => {
  // Состояние для хранения ширины окна
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Функция для обновления ширины окна
    const handleResize = () => {
        setWindowHeight(window.innerHeight);
    };

    // Добавляем обработчик события resize
    window.addEventListener('resize', handleResize);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowHeight;
};

export default useWindowHeight;