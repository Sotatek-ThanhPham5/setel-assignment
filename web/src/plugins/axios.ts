import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// require("dotenv").config();

const baseUrl = process.env.REACT_APP_BASE_URL;
const options = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const axiosInstance = axios.create(options);
axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
  return request;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
      const res = { ...response?.data, success: response?.data?.code === 200 };
      return res;
  },
  async (error) => {
      const res = {
          ...error.response?.data,
          success: error?.response?.data?.code === 200,
      };
      return res;
  },
);
export default axiosInstance;
