import React, { Component } from "react";
import { _grade, _class, _subject, _addGrade, _del_grade } from "@/api/manger";
import "./class.css";
import "antd/dist/antd.css";
import { Layout, Button, Modal, Select, Form, Input } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import Change from "./class/change";

const { Content } = Layout;
const { Option } = Select;
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

interface Iprops {
  // state:a
}
interface Istate {
  // list:<Ilist>
}
interface Ilist {
  grade_name: string;
}

export default class Class extends Component<Iprops, Istate> {
  formRef = React.createRef<FormInstance>();
  componentDidMount() {
    this.grade();
    this.class();
    this.subject();
  }
  state = {
    list: [],
    visible: false,
    room: [],
    subject: [],
    changeList: [],
  };
  //获取课程名接口

  async subject() {
    let res = await _subject();

    this.setState({
      subject: res.data.data,
    });
    console.log(res.data.data);
  }
  //获取班级接口
  async grade() {
    let res = await _grade();
    this.setState({
      list: res.data.data,
    });
    console.log(this.state.list);
  }

  //获取教室接口
  async class() {
    let res = await _class();
    this.setState({
      room: res.data.data,
    });
    console.log(this.state.room);
  }
  //对话框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //增加班级
  async addGrade(values: object) {
    await _addGrade(values);
  }

  //删除
  del(grade_id: string) {
    this.delGrade(grade_id);
  }
  async delGrade(grade_id: string) {
    await _del_grade(grade_id);
  }
  //点击编辑
  change(grade_id: string) {
    console.log(grade_id);
  }

  handleOk = (e: any) => {
    console.log(e);

    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onGenderChange = (value: any) => {
    this.formRef.current?.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };
  onFinish = (values: any) => {
    this.addGrade(values);
    // console.log(values)
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
    this.setState({
      visible: false,
    });
  };
  //
  render() {
    // console.log(this.state.room)

    return (
      <div>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div className="abc" style={{ padding: 24, background: "#fff", overflowY: "scroll" }}>
              <p>
                {/* 添加班级 */}
                <Button type="primary" onClick={this.showModal}>
                  +添加班级
                </Button>

                <Modal title="添加试题" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                  <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item
                      name="grade_name"
                      label="班级名"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="room_id"
                      label="课程名"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Select a option and change input text above" onChange={this.onGenderChange} allowClear>
                        {/* <Option value="female">female</Option>
            <Option value="other">other</Option> */}
                        {this.state.subject.map((item: any, index) => {
                          return <Option value={item.subject_text}>{item.subject_text}</Option>;
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="subject_id"
                      label="教室号"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Select a option and change input text above" onChange={this.onGenderChange} allowClear>
                        {this.state.room.map((item: any, index) => {
                          return <Option value={item.room_id}>{item.room_text}</Option>;
                        })}
                      </Select>
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
                      <Button htmlType="button" onClick={this.onReset}>
                        Reset
                      </Button>
                      {/* <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button> */}
                    </Form.Item>
                  </Form>
                </Modal>
              </p>
              <div>
                <p className="bigbox">
                  <span>班级名</span>
                  <span>课程名</span>
                  <span>教室号</span>
                  <span>操作</span>
                </p>
                <div>
                  {this.state.list.map((item: any) => {
                    return (
                      <p className="box">
                        <span>{item.grade_name}</span>
                        <span>{item.subject_text}</span>
                        <span>{item.room_text}</span>
                        <span className="font">
                          <span>
                            <Change key={item.room_id} change={this.change} id={item.grade_id} list={this.state.list} subject={this.state.subject} room={this.state.room} />
                          </span>
                          |
                          <span
                            onClick={() => {
                              this.del(item.grade_id);
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
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
