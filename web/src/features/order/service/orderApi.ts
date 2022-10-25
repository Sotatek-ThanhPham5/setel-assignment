import axiosInstance from "../../../plugins/axios";
import { ICreateOrder } from "../constant/order.constant";
interface IBodyResponse {
  success: boolean;
  code: number;
  message: string;
  data: {};
}
export async function getOrderList() {
  return await axiosInstance.get("/order");
}

export async function getOrderDetail(id: string) {
  return await axiosInstance.get(`/order/${id}`);
}

export async function createOrder(body: ICreateOrder) {
  return await axiosInstance.post("/order", body);
  // const response = await fetch("http://localhost:3001/api/order", {
  //   method: "POST",
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json; charset=UTF-8",
  //   },
  //   body: JSON.stringify(body),
  // });
  // return response.json();
}

export async function cancel(id: string) {
  return await axiosInstance.put(`/order/${id}/cancel`);
}
