import { IProducts } from '@/interface/IProducts';
import { axiosInstance } from './instance'
// import { ApiRoutes } from './constants';
import { routes } from './routes'
export const search = async (query: string, path:string[] | null | string ): Promise<IProducts[]> => {
  return (await axiosInstance.post<IProducts[]>(routes.searchProducts, { query: { query },  path:{ path }}))
    .data;
};
export const findByCard = async (id:number[]): Promise<IProducts[]> => {
  return (await axiosInstance.post<IProducts[]>(routes.findProducts, { id }))
    .data;
};
export const info = async (query: string): Promise<IProducts> => {
  return (await axiosInstance.get<IProducts>(routes.searchProduct, { params: { query } }))
    .data;
};
export const create = async (name: string | null, image:string | null, description:string | null, price:string | null, link:string)=> {
  return (await axiosInstance.post(routes.createProduct, { name, link, price, image, description}))
    .data;
};
export const update = async (id:number|null,name: string | null, image:string | null, description:string | null, price:string | null, link:string, day?:string) => {
  return (await axiosInstance.put(routes.updateProduct, {id, name, link, price, image, description,day}))
    .data;
};
export const updateMenu = async (value:number[]) => {
  console.log(value)
  return (await axiosInstance.put(routes.updateMenuProduct , value))
    .data;
};
export const productDelete = async (id:number) => {
  return (await axiosInstance.delete(routes.deleteProduct, {params: {id}}))
    .data;
};