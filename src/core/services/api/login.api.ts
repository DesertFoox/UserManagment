import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

interface UserData {
    username: string;
    password: string;
    rememberMe:boolean;
}

export const loginUser = async (userData: UserData): Promise<AxiosResponse> => {
  return await methods.post(
    `${MainUrl}/auth/login` , userData
  );
};

export const useLogin = () => {
    return useMutation(loginUser, { retry: 2 });
};
