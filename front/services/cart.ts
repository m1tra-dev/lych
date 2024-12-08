import { ICart } from "@/interface/ICart";
import { axiosInstance } from "./instance";
import { routes } from "./routes";

export const cart = async (id:number, userId:number, productId: number, quantity: number): Promise<ICart> => {
    return (await axiosInstance.post<ICart>(routes.addToCartProduct, { id, userId, productId, quantity })).data;
  };