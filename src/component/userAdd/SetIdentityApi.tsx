import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, Select, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { _identity, _apiAuthority, _setIdentityApi } from "@/api/user";
import { OnsetIdentityApi } from "@/interface";

const { TabPane } = Tabs;
const { Option } = Select;

function SetIdentityApi() {
  const [form] = Form.useForm();
  const [optionList, setOptions] = useState([]);
  const [optionApi, setOptionsApi] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await _identity();
      let apiRes = await _apiAuthority();
      setOptions(res.data.data);
      setOptionsApi(apiRes.data.data);
    })();
  }, []);

  useEffect(() => {}, [optionList]);
  useEffect(() => {}, [optionApi]);

  const onFinish = async (values: OnsetIdentityApi) => {
    console.log(values);
    let res = await _setIdentityApi(values);
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
      <TabPane tab="给身份设置api接口权限" key="6">
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

          <Form.Item name="api_authority_id">
            <Select defaultActiveFirstOption={false} placeholder="请选择api接口权限">
              {optionApi.map((item: any) => {
                return (
                  <Option key={item.api_authority_id} value={item.api_authority_id}>
                    {item.api_authority_text}
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
export default SetIdentityApi;
