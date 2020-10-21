import React from "react";
import { Form, Input, Button, Tabs, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _authorityApiEdit } from "@/api/user";

const { TabPane } = Tabs;

function AuthorityApi() {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
    let res = await _authorityApiEdit(values);
    if (res.data.code !== 1) {
      openNotification({ code: res.data.code, msg: res.data.msg });
    } else {
      openNotification({ code: res.data.code, msg: res.data.msg });
    }
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  const openNotification = ({ code, msg }: { code: number; msg: string }) => {
    notification.open({
      message: msg,
      duration: 3,
      description: "",
      icon: code === 1 ? <CheckCircleOutlined style={{ color: "#1890ff" }} /> : <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
    });
  };

  return (
    <Tabs type="card" className="tabs">
      <TabPane tab="添加api接口权限" key="4">
        <Form form={form} name="add" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="api_authority_text">
            <Input placeholder="请输入api接口权限名称" />
          </Form.Item>

          <Form.Item name="api_authority_url">
            <Input placeholder="请输入api接口权限url" />
          </Form.Item>

          <Form.Item name="api_authority_method">
            <Input placeholder="请输入api接口权限方法" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button htmlType="button" style={{ marginLeft: "20px" }} onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
}
export default AuthorityApi;
