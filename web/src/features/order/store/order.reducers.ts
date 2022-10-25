import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const initialState = {
  orderList: [],
  orderDdetail: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDdetail = action.payload;
    },
  },
});
export const selectedOrderList = (state: RootState) => state.order.orderList;
export const selectedOrderDetail = (state: RootState) => state.order.orderDdetail;

export const { setOrderList, setOrderDetail } = orderSlice.actions;

export default orderSlice.reducer;
