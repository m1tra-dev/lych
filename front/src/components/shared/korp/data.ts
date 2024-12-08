import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { Phone } from 'lucide-react';
export const icons = [
    {
        href: '', // Замените на нужный URL
        ico: Phone,
        color: 'group-hover:bg-phoneDark',
        description:'Для оперативной связи с нами по вопросам продуктов, услуг или технической поддержки, пожалуйста, звоните по указанному номеру.',
        colorIco:'group-hover:text-phoneDark',
        colorBg:'bg-phoneLight'
        
    },
    {
        href:'',
        ico:faTelegram,
        color:'group-hover:bg-tg',
        description:'Подписывайтесь на наш телеграм канал, чтобы быть в курсе последних новостей, акций и мероприятий компании, а также получать полезную информацию о продуктах и услугах.',
        colorIco:'group-hover:text-tg',
        colorBg:'bg-tgLight'
        },
    {
        href:'',
        ico:faVk,
        color:'group-hover:bg-vk',
        description:'Присоединяйтесь к нашей группе в социальной сети ВКонтакте, чтобы общаться с другими клиентами, задавать вопросы и получать обратную связь от нашей команды.',
        colorIco:'group-hover:text-vk',
        colorBg:'bg-vkLight'
        }]