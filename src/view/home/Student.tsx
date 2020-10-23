import React, { Component } from "react";
import { Layout, Row, Col, Input } from "antd";
import "./class.css";
import "antd/dist/antd.css";
import { Select, Button, Table } from "antd";
import { _student, _del_student, _class, _grade } from "@/api/manger";

const { Option } = Select;

const { Content } = Layout;

const columns = [
  {
    title: "student_name",
    dataIndex: "student_name",
  },
  {
    title: "student_id",
    dataIndex: "student_id",
  },
  {
    title: "grade_name",
    dataIndex: "grade_name",
  },
  {
    title: "room_text",
    dataIndex: "room_text",
  },
  {
    title: "student_pwd",
    dataIndex: "student_pwd",
  },
  {
    title: "操作",
    dataIndex: "subject_text",
  },
];
let list1 = {
  a: "",
  b: "",
  c: "",
};

let data: any[] | undefined = [];

interface Iprops {
  history: any;
}
interface Istate {
  list: any;
  current: number;
  StartEnd: number;
  end: number;
  newList: any[];
  list1: any;
  room: any;
  grade: any;
}

export default class Student extends Component<Iprops, Istate> {
  handleChange(value: any) {
    list1.b = value;
  }
  handleChangec(value: any) {
    list1.c = value;
  }

  state = {
    list: [],
    current: 1,
    StartEnd: 0,
    end: 9,
    newList: [],
    list1: "",
    room: [],
    grade: [],
  };

  componentDidMount() {
    this.student();
    this.class();
    this.grade();
  }
  change(e: any) {
    list1.a = e.target.value;
  }

  //获取班级接口
  async grade() {
    let res = await _grade();
    this.setState({
      grade: res.data.data,
    });
  }

  //获取教室接口
  async class() {
    let res = await _class();
    this.setState({
      room: res.data.data,
    });
  }

  async student() {
    let res = await _student();

    res.data.data?.forEach((item: any) => {
      item.subject_text = "删除";
    });
    data = res.data.data;
    this.setState({
      list: res.data.data,
    });
  }
  async del(student_id: string) {
    await _del_student(student_id);
    this.props.history.go(0);
  }
  dsad = () => {
    console.log(this.props.history.go(0));
  };
  red = () => {
    this.student();
    let arr = [];
    arr = this.state.list.filter((item: any) => {
      return list1.a !== "" ? item.student_name.includes(list1.a) : "" + list1.b !== "" ? item.room_text.includes(list1.b) : "" + list1.c !== "" ? item.grade_name.includes(list1.c) : "";
    });
    this.setState({
      list: arr,
    });
  };
  render() {
    // const stype="+ 添加课程"
    return (
      <div>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div className="abc" style={{ padding: 24, background: "#fff", overflowY: "scroll" }}>
              <Row>
                <Col span={6}>
                  <Input onChange={this.change}></Input>
                </Col>
                <Col span={5}>
                  <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    {this.state.room.map((item: any) => {
                      return <Option value={item.room_text}>{item.room_text}</Option>;
                    })}
                  </Select>
                </Col>
                <Col span={5}>
                  <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChangec}>
                    {this.state.grade.map((item: any) => {
                      return <Option value={item.grade_name}>{item.grade_name}</Option>;
                    })}
                  </Select>
                </Col>
                <Col span={5}>
                  {" "}
                  <Button type="primary" onClick={this.red}>
                    搜索
                  </Button>
                </Col>
                <Col span={3}>
                  <Button type="primary" onClick={this.dsad}>
                    重置
                  </Button>{" "}
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={data}
                size="middle"
                onRow={(record) => {
                  return {
                    onClick: (event) => {
                      let tar = event.target;
                      if (((tar as any).innerHTML = "删除")) {
                        this.del(record.student_id);
                      }
                    }, // 点击行
                  };
                }}
              />
              <div></div>
              <div></div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
