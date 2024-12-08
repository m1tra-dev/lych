// import { Controller, Get, Post, Body, Res, Param, Delete, Query, Put } from '@nestjs/common';
// import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { UpdateMenuProductDto } from './dto/updatemenu-product.dto';


// @Controller('product')
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   // @Post()
//   // create(@Body() createProductDto: CreateProductDto) {
//   //   return this.productService.create(createProductDto);
//   // }

//   @Post()
//   findAll(@Body() body: any) {
    
//     return this.productService.findCategoryByLink(body);
//   }


//   @Get('findAll')
//   async FindAllProd() {
//     return this.productService.FindAllProduct();
//   }

//   @Post('create')
//   async create(@Body() dto:CreateProductDto, @Res() res){
//     return this.productService.createProduct(dto, res)
//   }

//   @Post('search')
//   async searchProducts(@Body() body: {query:string, path:string}) {
//     return this.productService.findSearch(body.query,body.path);
//   }

//   @Post('find')
//   async findProducts(@Body() body: {id}) {
//     return this.productService.findProducts(body.id);
//   }

//   @Put('update')
//   async update(@Body() dto:UpdateProductDto, @Res() res){
//     return this.productService.updateProduct(dto, res)
//   }

//   @Put('updateMenu')
//   async updateMenu(@Body() dto:UpdateMenuProductDto, @Res() res){
//     return this.productService.updateMenuProduct(dto, res)
//   }

//   @Get('info')
//   async info(@Query() query: any) {
//     return this.productService.getProductInfo(+query.query);
//   }

//   @Delete('delete')
//   async deleteProduct(@Query('id') id: number) {
//     const deletedProduct = await this.productService.delete(+id);
//     return deletedProduct;

// src/products/products.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Query,UseGuards,UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { JwtAuthGuard } from 'src/decorators/auth.decorators';
import { AdminGuard } from 'src/decorators/admin.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}
  @Get('category/:id')
  async getProductsByCategory(@Param('id') id: string): Promise<Product[]> {
    return this.productsService.findByCategory(Number(id));
  }

  @Get('search')
  async searchProducts(
    @Query('term') term: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<Product[]> {
    return this.productsService.searchProducts(term, categoryId ? Number(categoryId) : undefined);
  }
  
  @Get('paginated')
  async getPaginatedProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Product[]> {
    const pageNumber = parseInt(page, 10) || 1; 
    const limitNumber = parseInt(limit, 10) || 10; 
    return this.productsService.findAllPaginated(pageNumber, limitNumber);
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createProductDto: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: Partial<Product>) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }

}

