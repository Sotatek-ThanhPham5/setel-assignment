import { Button, Form, Input, message, Modal } from "antd";
import { ICreateOrder } from "../constant/order.constant";
import { createOrder } from "../service/orderApi";

type Props = {
  isShowModalCreate?: boolean;
  handleCancelModalCreate?: () => void;
};
export function ModalCreate(props: Props) {
  const { isShowModalCreate, handleCancelModalCreate } = props;

  const onFinish = async (values: ICreateOrder) => {
    const order = {
      name: values.name,
      amount: +values.amount,
    };
    const response: any = await createOrder(order);
    if (response?.success) {
      message.success("Create new order successful!");
    }
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //   };
  return (
    <Modal
      title="Create new order"
      open={isShowModalCreate}
      onCancel={handleCancelModalCreate}
      destroyOnClose={true}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Order Name"
          name="name"
          rules={[{ required: true, message: "Please input order name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Order Amount"
          name="amount"
          rules={[{ required: true, message: "Please input order amount" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
