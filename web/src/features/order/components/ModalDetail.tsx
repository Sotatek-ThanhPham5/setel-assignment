import { Col, Modal, Row, Tag } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { OrderStatus } from "../constant/order.constant";
import { selectedOrderDetail } from "../store/order.reducers";

type Props = {
  isModalOpen?: boolean;
  handleCancel?: () => void;
};
export function ModalDetail(props: Props) {
  const { isModalOpen, handleCancel } = props;
  const orderDetail: any = useAppSelector(selectedOrderDetail);
  
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
  return (
    <Modal
      title="Order Detail"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <Row>
        <Col span={8}>Order name:</Col>
        <Col span={16}>{orderDetail.name}</Col>
      </Row>
      <Row>
        <Col span={8}>Order amount:</Col>
        <Col span={16}>{orderDetail.amount}</Col>
      </Row>
      <Row>
        <Col span={8}>Status:</Col>
        <Col span={16}>
          <Tag color={handleStatus(orderDetail.status)}>
            {orderDetail.status}
          </Tag>
        </Col>
      </Row>
    </Modal>
  );
}
