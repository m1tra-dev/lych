import { IProducts } from "@/interface/IProducts";
import { axiosInstance } from "./instance";
import { routes } from "./routes";

export const categories = async (): Promise<IProducts[]> => {
    return (await axiosInstance.get<IProducts[]>(routes.searchCategories)).data;
  };
export const categoryUpdate = async (id:number,name:string,link:string): Promise<IProducts[]> => {
    return (await axiosInstance.put(routes.searchCategories, {id, name, link}))
  };
export const categoryCreate = async (id:number,name:string,link:string): Promise<IProducts[]> => {
    return (await axiosInstance.post(routes.searchCategories, {id, name, link}))
  };
