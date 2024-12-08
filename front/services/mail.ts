import { axiosInstance } from "./instance";
import { routes } from "./routes";

export const sendMail = async (email:string) => {
    return (await axiosInstance.post(routes.sendActivateMail, {email}))
      .data;
  };