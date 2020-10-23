import React, { Component } from "react";
import { Layout, Button, Modal, Form, Input } from "antd";
import "@/view/home/class.css";
import "antd/dist/antd.css";
import { _class, _del_grade, _addRoom } from "@/api/manger";
import { FormInstance } from "antd/lib/form/Form";
const { Content } = Layout;

interface Iprops {
  stype: any;
}

interface IState {
  stype: string;
  visible: boolean;
  list: any;
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class laye extends Component<Iprops, IState> {
  state = {
    visible: false,
    stype: "",
    list: [],
  };

  formRef = React.createRef<FormInstance>();
  onGenderChange = (value: any) => {
    this.formRef.current?.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };
  onFinish = (values: any) => {
    // console.log(values);
    let room_text = values.name;
    this.addroom(room_text);
    this.setState({
      visible: false,
    });
  };
  onReset = () => {
    this.formRef.current?.resetFields();
  };
  onFill = () => {
    this.formRef.current?.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };
  componentDidMount() {
    this.setState({
      stype: this.props.stype,
    });
    this.room();
  }
  //获取教室
  async room() {
    let res = await _class();
    this.setState({
      list: res.data.data,
    });
    console.log(res.data.data);
  }
  //教室删除
  del(id: any) {
    // console.log(id)
    this.dedl(id);
  }
  //添加教室
  async addroom(room_text: string) {
    await _addRoom(room_text);
  }

  async dedl(id: string) {
    await _del_grade(id);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    let room_text = e.name;
    this.addroom(room_text);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    let room_text = e.name;
    this.addroom(room_text);
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="abc" style={{ padding: 24, background: "#fff", overflowY: "scroll" }}>
            <p>
              <Button type="primary" onClick={this.showModal}>
                {this.state.stype}
              </Button>
              <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                  <Form.Item
                    name="name"
                    label="教室名称"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
                    {({ getFieldValue }) => {
                      return getFieldValue("gender") === "other" ? (
                        <Form.Item
                          name="customizeGender"
                          label="Customize Gender"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </p>
            <p className="bigbox">
              <span>教室号</span>
              <span>操作</span>
            </p>
            <div>
              {this.state.list.map((item: any, index) => {
                return (
                  <p className="box">
                    <span key={item.room_id}>{item.room_text}</span>
                    <span className="font">
                      <span
                        onClick={() => {
                          this.del(item.room_id);
                        }}
                      >
                        删除
                      </span>
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default laye;
