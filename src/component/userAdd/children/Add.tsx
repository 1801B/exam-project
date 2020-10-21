import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _identity, _user } from "@/api/user";
import { User } from "@/interface";

const { Option } = Select;

function Add() {
  const [form] = Form.useForm();
  const [optionList, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await _identity();
      setOptions(res.data.data);
    })();
  }, []);

  useEffect(() => {
    return;
  }, [optionList]);

  const onFinish = async (values: User) => {
    let res = await _user(values);
    if (res.data.code !== 1) {
      res.data.err.errors.forEach((item: any) => {
        openNotification({ code: res.data.code, msg: item.message });
      });
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
    <Form form={form} name="add" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="user_name">
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item name="user_pwd">
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item name="identity_id">
        <Select style={{ width: "65%" }} defaultActiveFirstOption={false} placeholder="选择身份id">
          {optionList.map((item: any) => {
            return (
              <Option key={item.identity_id} value={item.identity_id}>
                {item.identity_text}
              </Option>
            );
          })}
        </Select>
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
  );
}
export default Add;
