import { PrismaClient } from '@prisma/client';
import { link } from 'fs';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { category: "Завтраки" },
    { category: "Обеды" },
    { category: "Ужины" },
    { category: "Закуски" },
    { category: "Напитки" }
  ];

  const createdCategories = await prisma.category.createMany({
    data: categories,
  });

  const products = [
    { name: "Омлет с овощами", description: "Вкусный омлет с овощами", price: "150", parentId: 1 },
    { name: "Блинчики с творогом", description: "Нежные блинчики с начинкой", price: "180", parentId: 1 },
    { name: "Каша гречневая", description: "Полезная гречневая каша", price: "120", parentId: 1 },
    { name: "Суп-пюре из брокколи", description: "Легкий суп-пюре", price: "200", parentId: 2 },
    { name: "Куриный бульон", description: "Ароматный куриный бульон", price: "180", parentId: 2 },
    { name: "Паста с томатным соусом", description: "Итальянская паста", price: "250", parentId: 2 },
    { name: "Стейк из свинины", description: "Сочный стейк на гриле", price: "450", parentId: 3 },
    { name: "Курица с картошкой", description: "Запеченная курица с гарниром", price: "400", parentId: 3 },
    { name: "Лосось на гриле", description: "Запеченный лосось с лимоном", price: "600", parentId: 3 },
    { name: "Салат Оливье", description: "Классический салат Оливье", price: "220", parentId: 4 },
    { name: "Чипсы картофельные", description: "Хрустящие картофельные чипсы", price: "80", parentId: 4 },
    { name: "Фрукты ассорти", description: "Ассорти свежих фруктов", price: "250", parentId: 4 },
    { name: "Кофе американо", description: "Ароматный черный кофе", price: "90", parentId: 5 },
    { name: "Чай черный", description: "Чай с лимоном", price: "80", parentId: 5 },
    { name: "Сок яблочный", description: "Свежевыжатый яблочный сок", price: "120", parentId: 5 },
    { name: "Творожная запеканка", description: "Нежная запеканка из творога", price: "200", parentId: 1 },
    { name: "Яйцо всмятку", description: "Яйцо всмятку с зеленью", price: "50", parentId: 1 },
    { name: "Гречка с грибами", description: "Гречка с жареными грибами", price: "150", parentId: 1 },
    { name: "Суп из чечевицы", description: "Питательный суп из чечевицы", price: "180", parentId: 2 },
    { name: "Ризотто с грибами", description: "Итальянское ризотто с грибами", price: "300", parentId: 2 },
    { name: "Бургер с говядиной", description: "Бургер с сочной говядиной и овощами", price: "350", parentId: 2 },
    { name: "Куриные крылышки в соусе", description: "Крылышки в остром соусе", price: "250", parentId: 3 },
    { name: "Рагу из говядины", description: "Нежное рагу из говядины с овощами", price: "500", parentId: 3 },
    { name: "Пирог с яблоками", description: "Домашний пирог с яблоками", price: "220", parentId: 4 },
    { name: "Сухарики чесночные", description: "Хрустящие чесночные сухарики", price: "70", parentId: 4 },
    { name: "Салат из свежих овощей", description: "Легкий салат из свежих овощей", price: "150", parentId: 4 },
    { name: "Капучино", description: "Кофе с молочной пенкой", price: "120", parentId: 5 },
    { name: "Лимонад домашний", description: "Освежающий лимонад с мятой", price: "130", parentId: 5 },
    { name: "Сок гранатовый", description: "Свежевыжатый гранатовый сок", price: "150", parentId: 5 },
    { name: "Панкейки с медом", description: "Нежные панкейки с медом и ягодами", price: "200", parentId: 1 },
    { name: "Запеканка из кабачков", description: "Запеканка из кабачков и сыра", price: "180", parentId: 1 },
    { name: "Салат с тунцом и яйцом", description: "Питательный салат с тунцом и яйцом вкрутую", price: "250", parentId: 4 },
    { name: "Торт Наполеон", description: "Классический торт Наполеон на слоеном тесте.", price:"300" ,parentId : 4},
    { name:"Суп харчо" ,description:"Острый суп харчо с мясом" ,price:"220" ,parentId : 2},
    { name:"Курица в кисло-сладком соусе" ,description:"Курица в кисло-сладком соусе с рисом" ,price:"350" ,parentId : 3},
    { name:"Пицца Маргарита" ,description:"Пицца с томатами и сыром моцарелла" ,price:"400" ,parentId : 2},
    { name:"Морс ягодный" ,description:"Освежающий морс из ягод" ,price:"120" ,parentId : 5},
    { name:"Салат Цезарь с курицей" ,description:"Классический салат Цезарь с курицей" ,price:"250" ,parentId : 4},
    { name:"Котлета по-киевски" ,description:"Котлета по-киевски с картофельным пюре" ,price:"400" ,parentId : 3},
    { name:"Фруктовый салат" ,description:"Ассорти из свежих фруктов" ,price:"200" ,parentId : 4},
    { name:"Горячий шоколад" ,description:"Ароматный горячий шоколад" ,price:"150" ,parentId : 5},
    { name:"Торт чизкейк" ,description:"Нежный чизкейк на основе творога" ,price:"350" ,parentId : 4},
    { name:"Пирожок с капустой" ,description:"Вкусный пирожок с капустой и яйцом" ,price:"100" ,parentId : 4},
    { name:"Суп из грибов" ,description:"Ароматный суп из свежих грибов" ,price:"220" ,parentId : 2},
    { name:"Борщ украинский" ,description:"Классический борщ со сметаной" ,price:"200" ,parentId : 2},
    { name:"Фрикадельки в томатном соусе" ,description:"Фрикадельки в томатном соусе с гарниром" ,price:"300" ,parentId : 3},
    { name:"Пирожное эклер" ,description:"Классическое пирожное эклер с кремом" ,price:"150" ,parentId : 4},
    
];

   for (const product of products) {
      await prisma.product.create({
        data: product,
      });
   }

   console.log("Данные успешно добавлены!");
}

main()
   .catch(e => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
