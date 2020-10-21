import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, Select, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _viewAuthority, _authorityApiEdit } from "@/api/user";
import { AuthorityApiEdit } from "@/interface";

const { TabPane } = Tabs;
const { Option } = Select;

function AuthorityView() {
  const [form] = Form.useForm();
  const [optionList, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await _viewAuthority();
      setOptions(res.data.data);
    })();
  }, []);

  useEffect(() => {
    return;
  }, [optionList]);

  const onFinish = async (values: AuthorityApiEdit) => {
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
      <TabPane tab="添加视图接口权限" key="5">
        <Form form={form} name="add" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="identity_id">
            <Select defaultActiveFirstOption={false} placeholder="请选择已有视图">
              {optionList.map((item: any) => {
                return (
                  <Option key={item.view_authority_id} value={item.view_authority_id}>
                    {item.view_authority_text}
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
      </TabPane>
    </Tabs>
  );
}
export default AuthorityView;
