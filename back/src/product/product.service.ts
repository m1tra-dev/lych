// import { Injectable, Res } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { Category } from '@prisma/client';

// @Injectable()
// export class ProductService {

//   constructor(private readonly prisma: PrismaService) {}

//   async getProductInfo(id) {
    
//     const el = await this.prisma.category.findUnique({
//       where:{
//         id,
        
//     },})
//     console.log(el)
//     if (el&&el.parentId!=0){
//       return el
//     }
//     else{
//       throw new  Error('продукт не найден')
//     }
//   }
  
//   async findProducts(ids: number[]){
//     return this.prisma.category.findMany({
//       where: {
//         id: {
//           in: ids,
//         },
//       },
//     });
//   }

//   async findSearch(id,path){
//     let el=null
//     if (path.path){
//       el = await this.prisma.category.findFirst({
//         where: {
//           link: path.path,
//         },
//       })}
  
//     return await this.prisma.category.findMany({
//       where:{
//         ...(el ? { parentId: el.id } : {parentId: {not: 0}}),
//         name: {
//           contains: id.query, 
//           mode: 'insensitive',
//         }, 
//       },
//       orderBy: {
//         id: 'asc', // Сортировка по имени в порядке возрастания
//       },
//     })
//   }


//   async FindAllProduct(){
//    return await this.prisma.category.findMany({
//     where:{
//       parentId: {
//         not:0
//       },
//     }
//   })
//   }

//   async findCategoryByLink(path){
//     const el = await this.prisma.category.findFirst({
//       where: {
//         link: path.path,
//       },
//     });
//     return this.prisma.category.findMany({
//       where:{
//         parentId:el.id,
//       }
//     })
//   }
//   async createProduct(dto,res){
//     try {
//       const el = await this.prisma.category.findFirst({
//         where: {
//           name: dto.link,
//         },
//       });
//       if (!el) {
//         return res.status(404).send({ message: 'Category not found' });
//       }
  
//       dto.parentId = el.id;
//       delete dto.link;
  
//       const result = await this.prisma.category.createMany({
//         data: dto,
//         skipDuplicates: true,
//       });
  
//       if (result.count === 0) {
//         return res.status(400).send({ message: 'Продукт не был создан' });
//       }
  
//       return res.status(200).send({ message: 'Продукт успешно создан' });
//     } catch (error) {
//       console.error('Error creating product:', error);
//       return res.status(500).send({ message: 'An error occurred' });
//     }
//   }

//   async updateProduct(dto,res){
//     try {
//       const el = await this.prisma.category.findFirst({
//         where: {
//           name: dto.link,
//         },
//       });

//       if (!el) {
//         return res.status(404).send({ message: 'Category not found' });
//       }

//       dto.parentId = el.id;
//       delete dto.link;

//       await this.prisma.category.updateMany({
//         where: { id: dto.id },
//         data: dto,
//       });
      
//       // Возвращаем статус-код 200
//       return res.status(200).send({ message: 'Продукт успешно обновлен' });
//     } catch (error) {
//       // В случае ошибки можно вернуть другой статус-код
//       return res.status(500).send({ message: 'An error occurred', error: error.message });
//     }
//   }
  
//   async updateMenuProduct(dto,res){
//     null
//   }

//   async delete(id:number){
//     const el = await this.prisma.category.delete({
//       where: { id },
//     });
//   } 
  
// }

import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { Prisma, Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AdminGuard } from 'src/decorators/admin.guard';


@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        parentId: categoryId,
      },
    });
  }
  async findAllPaginated(page: number = 1, limit: number = 10): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.prisma.product.findMany({
      skip,
      take: limit,
    });
  }
  async searchProducts(term: string, categoryId?: number): Promise<Product[]> {
    const whereClause: Prisma.ProductWhereInput = {
      name: {
        contains: term,
        mode: 'insensitive', 
      },
    };
    if (categoryId) {
      return this.prisma.product.findMany({
        where: {
          ...whereClause,
          parentId: categoryId, 
        },
      });
    }
    
    return this.prisma.product.findMany({
      where: whereClause,
    });
  }
  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      return await this.prisma.product.create({ data });
    } 
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
          throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Ошибка при создании продукта', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });
  
      if (!product) {
        throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND);
      }
  
      return product;
    } catch (error) {
      throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    try {
      return this.prisma.product.update({
        where: { id },
        data,
      });
    } 
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
          throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Ошибка при обновлении продукта', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<Product> {

    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });
  
      if (!product) {
        throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND);
      }
  
      return product;
    } catch (error) {
      throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND);
    }
  }
}
