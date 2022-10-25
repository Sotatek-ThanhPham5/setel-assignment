export enum OrderStatus {
  Created = "created",
  Confirmed = "confirmed",
  Delivered = "delivered",
  Canceled = "canceled",
}

export interface ICreateOrder {
  name: string;
  amount: number;
}