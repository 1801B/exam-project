import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, Select, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _identity, _viewAuthority, _setIdentityView } from "@/api/user";
import { OnsetIdentityView } from "@/interface";

const { TabPane } = Tabs;
const { Option } = Select;

function SetIdentityView() {
  const [form] = Form.useForm();
  const [optionList, setOptions] = useState([]);
  const [optionApi, setOptionsApi] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await _identity();
      let apiRes = await _viewAuthority();
      setOptions(res.data.data);
      setOptionsApi(apiRes.data.data);
    })();
  }, []);

  useEffect(() => {}, [optionList]);
  useEffect(() => {}, [optionApi]);

  const onFinish = async (values: OnsetIdentityView) => {
    let res = await _setIdentityView(values);
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
      <TabPane tab="给身份设置视图权限" key="7">
        <Form form={form} name="add" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="identity_id">
            <Select defaultActiveFirstOption={false} placeholder="请选择身份id">
              {optionList.map((item: any, index) => {
                return (
                  <Option key={item.identity_id + index} value={item.identity_id}>
                    {item.identity_text}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="view_authority_id">
            <Select defaultActiveFirstOption={false} placeholder="请选择api接口权限">
              {optionApi.map((item: any, index) => {
                return (
                  <Option key={item.view_authority_id + index} value={item.view_authority_id}>
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

export default SetIdentityView;
