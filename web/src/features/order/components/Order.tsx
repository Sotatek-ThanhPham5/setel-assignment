import { Button, message, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { OrderStatus } from "../constant/order.constant";
import { getOrderList, cancel, getOrderDetail } from "../service/orderApi";
import {
  selectedOrderList,
  setOrderDetail,
  setOrderList,
} from "../store/order.reducers";
import { ModalCreate } from "./ModalCreate";
import { ModalDetail } from "./ModalDetail";

export function Order() {
  const [isShowModalDetail, setShowModalDetail] = useState(false);
  const [isShowModalCreate, setShowModalCreate] = useState(false);
  const dispatch = useDispatch();
  const orders = useAppSelector(selectedOrderList);

  const fetchOrderList = async () => {
    const response = await getOrderList();
    if (response.data) {
      dispatch(setOrderList(response.data.items));
    }
  };
  useEffect(() => {
    fetchOrderList();
  }, []);

  const handleCancel = () => {
    setShowModalDetail(false);
  };

  const handleCancelModalCreate = () => {
    setShowModalCreate(false);
  };

  const cancelOrder = async (id: string) => {
    const response: any = await cancel(id);
    if (response?.success) {
      await fetchOrderList();
      message.success("Cancel order successful!");
    } else {
      message.error("Cancel order unsuccessful!");
    }
  };
  const viewDetail = async (id: string) => {
    const response: any = await getOrderDetail(id);
    if (!response.success) {
      message.error(response.message);
    }
    dispatch(setOrderDetail(response.data));
    setShowModalDetail(true);
  };
  const handleStatus = (status: string) => {
    switch (status) {
      case OrderStatus.Canceled:
        return "red";
      case OrderStatus.Confirmed:
        return "blue";
      case OrderStatus.Delivered:
        return "green";
      case OrderStatus.Created:
        return "blue";
    }
  };
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Tag color={handleStatus(record.status)}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => viewDetail(record._id)}>
            Detail
          </Button>
          <Button
            disabled={
              record.status === "canceled" || record.status === "delivered"
            }
            danger
            onClick={() => cancelOrder(record._id)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Order Management</h1>

      <Button
        type="primary"
        onClick={() => {
          setShowModalCreate(true);
        }}
      >
        Add New Order
      </Button>
      <Table
        columns={columns}
        dataSource={orders.map((item: any) => ({
          key: item._id,
          ...item,
        }))}
      />
      <ModalDetail
        isModalOpen={isShowModalDetail}
        handleCancel={() => handleCancel()}
      />
      <ModalCreate
        isShowModalCreate={isShowModalCreate}
        handleCancelModalCreate={() => handleCancelModalCreate()}
      />
    </div>
  );
}
