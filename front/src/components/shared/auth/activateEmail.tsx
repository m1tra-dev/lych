import { Context } from '@/app/layout';
import { Button, NotificationUi } from '@/components/ui';
import { Loading } from '@/components/ui/loading';
import { useContext, useEffect, useState } from 'react';
import { IClose } from './log';
import { Api } from '../../../../services/api-client';

export const ActivateEmail: React.FC<IClose> = ({ onClose }) => {
  const { store } = useContext(Context);
  const [notification, setNotification] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Функция для обновления состояния таймера в localStorage
  const updateLocalStorage = (time:any) => {
    localStorage.setItem('emailTimer', time);
  };

  useEffect(() => {
    // Проверяем наличие сохраненного времени в localStorage
    const savedTime = localStorage.getItem('emailTimer');
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      if (parsedTime > 0) {
        setTimeLeft(parsedTime);
        setIsButtonDisabled(true);
      }
    }

    // Запускаем таймер, если есть оставшееся время
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            updateLocalStorage(0); // Очищаем localStorage
            return 0;
          }
          const newTime = prev - 1;
          updateLocalStorage(newTime); // Обновляем localStorage
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer); // Очистка таймера при размонтировании
    }
  }, [timeLeft]);

  const handleSend = () => {
    const email = store.user.email;
    Api.mail.sendMail(email);
    setNotification(`Ссылка отправлена по почте ${email}`);
    setIsButtonDisabled(true);
    setTimeLeft(120); 
    updateLocalStorage(120); 
  };

  return (
    <div className='flex shadow-primary shadow-lg p-7 bg-white flex-col items-center justify-between w-96 rounded-md gap-2'>
      <h1>Ссылка на подтверждение аккаунта была отправлена на ваш почтовый ящик</h1>
      <Button onClick={onClose}>Принять</Button>
      <Button onClick={handleSend} disabled={isButtonDisabled}>
        {isButtonDisabled ? `Подождите... ${timeLeft} секунд` : 'Отправить снова'}
      </Button>
      {notification && (
        <div className='absolute top-0 right-0 m-10'>
          <NotificationUi onClose={() => setNotification('')}>{notification}</NotificationUi>
        </div>
      )}
    </div>
  );
};
