import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, notification, Input } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _viewAuthority, _authorityViewEdit } from "@/api/user";
import { AuthorityApiView } from "@/interface";

const { TabPane } = Tabs;

function AuthorityView() {
  const [form] = Form.useForm();
  const [optionList, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await _viewAuthority();
      setOptions(res.data.data);
    })();
  }, []);

  useEffect(() => {}, [optionList]);

  const onFinish = async (values: AuthorityApiView) => {
    let res = await _authorityViewEdit(values);
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
      <TabPane tab="添加视图接口权限" key="5">
        <Form form={form} name="add" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="view_authority_text">
            <Input placeholder="请输入视图" />
          </Form.Item>

          <Form.Item name="view_id">
            <Input placeholder="请输入视图id" />
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
export default AuthorityView;
