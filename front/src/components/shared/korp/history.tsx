import { motion, useAnimation, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { Typewrite } from "./typing";
import { Accordion } from "@/components/ui/accordion";

const value = [{
    title: "Как оформить корпоративный заказ?",
    description: "Для оформления корпоративного заказа свяжитесь с нашим менеджером по телефону или через электронную почту. Вы также можете заполнить форму на нашем сайте, указав все необходимые детали заказа."
},
{
    title: "Каковы минимальные объемы заказа для корпоративных клиентов?",
    description: "Минимальный объем заказа для корпоративных клиентов составляет 10 порций. Для больших мероприятий мы можем предложить специальные условия."
},
{
    title: "Предоставляете ли вы услуги по доставке?",
    description: "Да, мы предоставляем услуги по доставке для корпоративных заказов. Доставка осуществляется в указанный вами адрес в согласованное время."
},
{
    title: "Каковы условия оплаты для корпоративных клиентов?",
    description: "Оплата может быть произведена наличными при доставке или по безналичному расчету. Для постоянных клиентов возможно оформление счета с отсрочкой платежа."
},
{
    title: "Можно ли заказать индивидуальное меню для нашего мероприятия?",
    description: "Да, мы предлагаем возможность создания индивидуального меню в зависимости от ваших предпочтений и требований мероприятия."
},
{
    title: "Как происходит процесс согласования меню?",
    description: "После выбора индивидуального меню наш менеджер свяжется с вами для обсуждения всех деталей, включая количество порций и предпочтения по блюдам."
},
{
    title: "Есть ли возможность учесть аллергии или специальные диетические требования сотрудников?",
    description: "Мы всегда учитываем аллергии и специальные диетические требования. Пожалуйста, сообщите нам об этом при оформлении заказа."
},
{
    title: "Какова стоимость доставки и как она рассчитывается?",
    description: "Стоимость доставки зависит от расстояния до вашего офиса и объема заказа. Обычно она составляет фиксированную сумму или процент от общей стоимости заказа."
},
{
    title: "Каковы сроки выполнения заказа?",
    description: "Срок выполнения заказа обычно составляет 24 часа. Для срочных заказов, пожалуйста, свяжитесь с нашим менеджером для уточнения возможности выполнения."
},
{
    title: "Можно ли изменить заказ после его оформления?",
    description: "Да, изменения в заказе возможны до момента его подготовки. Пожалуйста, свяжитесь с нами как можно скорее, чтобы внести необходимые изменения."
},
{
    title: "Какие способы связи с менеджером по корпоративным заказам?",
    description: "Вы можете связаться с менеджером по телефону, электронной почте или через форму обратной связи на нашем сайте. Мы всегда готовы помочь вам!"
},
{
    title: "Предоставляете ли вы услуги по организации кейтеринга на мероприятиях?",
    description: "Да, мы предоставляем услуги кейтеринга для различных мероприятий, включая корпоративы, конференции и праздники. Свяжитесь с нами для получения подробной информации."
},
{
    title: "Есть ли возможность заказать пробное меню перед большим мероприятием?",
    description: "Да, мы можем организовать пробное меню, чтобы вы могли оценить качество наших блюд перед заказом для большого мероприятия."
},
{
    title: "Как происходит возврат или обмен товаров в случае недовольства?",
    description: "В случае недовольства вы можете обратиться к нам в течение 24 часов после получения заказа. Мы рассмотрим вашу жалобу и предложим решение, включая возврат или замену."
},
{
    title: "Какие меры безопасности и гигиены вы принимаете при приготовлении и доставке еды?",
    description: "Мы строго следуем стандартам безопасности и гигиены на всех этапах — от приготовления до доставки. Все продукты проходят контроль качества, а сотрудники регулярно обучаются основам санитарии."
}
];
export const History = () => {
    const targetRef = useRef(null);
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({target:ref});
    const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), { stiffness: 100, damping: 30 });  
    return (
        <motion.section ref={targetRef} className='  min-h-screen px-5   flex flex-col justify-center items-center  bg-white w-full self-center py-20 xl:w-[1280px]' ref={ref}  >
            <h2 className="text-3xl text-center font-semibold p-10 sm:text-start  ">Часто задаваемые вопросы</h2>
            <div className="w-full  xl:w-2/3">
                <Accordion value={value}></Accordion>
            </div>
            <div className=" border-t border-t-secondary border-b border-b-gray-200 w-full xl:w-2/3 text-secondary ">
                <p className=" text-lg p-5"><strong>Есть вопросы?</strong> <span className="font-light">Мы будем рады помочь! Свяжитесь с нами по любой проблеме, с которой вы можете столкнуться.</span></p>
                <Typewrite examples={[

                "Есть ли возможность заказать пробное меню перед большим мероприятием?",

                "Как происходит возврат или обмен товаров в случае недовольства?",

                "Какие меры безопасности и гигиены вы принимаете при приготовлении и доставке еды?",

                "В чём смысл жизни?",

                ]}/>
            </div>
            <button className="p-2 border-2 border-black w-2/3 rounded-2xl mt-5 hover:bg-secondary hover:text-gray-100 transition-colors duration-300"><a href="">Позвонить нам</a></button>

        </motion.section>
    );
}