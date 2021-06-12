import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   if (originalRequest.url.includes("RefreshToken")) {
    //     // will log out completely
    //   }
    //   originalRequest._retry = true;
    //   // get new access token
    //   //const accessToken = await refreshToken();
    //   axios.interceptors.request.use(
    //     (config: AxiosRequestConfig): AxiosRequestConfig => {
    //       // set new accesstoken to header
    //       //config.headers.Authorization = accessToken;
    //       return config;
    //     }
    //   );
    //   // check if refreshToken expire too later
    //   return originalRequest;
    // }

    const expectedError: boolean =
      error.response &&
      error.response.state >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      // tweak it later
      console.log(error.response.data.message[0]);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${config.data.accessToken}`; //getToken("accesstoken");
    return config;
  }
);

// export const setRefreshToHeader = (refreshToken: string): void => {
//   axios.interceptors.request.use(
//     (config: AxiosRequestConfig): AxiosRequestConfig => {
//       config.headers.refreshToken = refreshToken;
//       return config;
//     }
//   );
// };

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default methods;
