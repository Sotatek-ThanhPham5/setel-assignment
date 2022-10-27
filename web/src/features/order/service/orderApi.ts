import axiosInstance from "../../../plugins/axios";
import { ICreateOrder } from "../constant/order.constant";

export async function getOrderList() {
  const response = await axiosInstance.get("/order");
  return response 
}

export async function getOrderDetail(id: string) {
  const response = await axiosInstance.get(`/order/${id}`);
  return response;
}

export async function createOrder(body: ICreateOrder) {
  const response = await axiosInstance.post("/order", body);
  return response;
}

export async function cancel(id: string) {
  const response = await axiosInstance.put(`/order/${id}/cancel`);
  return response;
}
