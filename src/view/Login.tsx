import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AntdForm } from "@/interface";
import { _login } from "@/api/user.ts";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { FormInstance } from "antd/lib/form";

interface Props extends RouteComponentProps {
  user: any;
}

@observer
@inject("user")
class Login extends Component<Props, any> {
  formRef = React.createRef<FormInstance>();

  render() {
    return (
      <div className="login">
        <div className="login-main">
          <Form name="normal_login" ref={this.formRef} className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <span className="login-form-forgot">忘记密码</span>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  // 提交表单
  onFinish = async (values: AntdForm) => {
    const { username, password } = values;

    let res = await _login({ username, password });
    // 弹出提示框
    this.openNotification({ code: res.data.code, msg: res.data.msg });
    // token存入mobx中
    this.props.user.getToken(res.data.token);
    // 重置表单
    this.onReset();
    // 判断是否登录成功
    if (res.data.code === 1) {
      // 跳转页面
      this.props.history.push("/home");
    }
  };

  // 表单重置
  onReset = () => {
    (this.formRef as any).current.resetFields();
  };

  /**
   * 弹出的提示框
   * @param code 状态码
   * @param msg 提示信息
   */
  openNotification({ code, msg }: { code: number; msg: string }) {
    notification.open({
      message: msg,
      duration: 3,
      description: "",
      icon: code === 1 ? <CheckCircleOutlined style={{ color: "#1890ff" }} /> : <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
    });
  }
}

export default Login;
