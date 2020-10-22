import React, { Component } from "react";
import { _getExamList } from "@/api/waitclass.ts";
import { Table, Space } from "antd";
interface IProps {
  [key: string]: any;
}
interface IState {
  list: any;
  columns: any;
  gradeList: any;
}
class Waitclassmate extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      list: [],
      gradeList: [],
      columns: [
        {
          title: "班级",
          dataIndex: "grade_name",
          key: "1",
        },
        {
          title: "姓名",
          dataIndex: "student_name",
          key: "2",
        },
        {
          title: "阅卷状态",
          dataIndex: "status",
          key: "3",
        },
        {
          title: "开始时间",
          dataIndex: "start_time",
          key: "4",
        },
        {
          title: "结束时间",
          dataIndex: "end_time",
          key: "5",
        },
        {
          title: "成材率",
          dataIndex: "room_text",
          key: "6",
        },
        {
          title: "操作",
          key: "",
          render: (text: any, record: any) => (
            <Space size="middle">
              <span
                onClick={() => {
                  this.toStudentExamDetail(record);
                }}
              >
                批卷
              </span>
            </Space>
          ),
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.list} rowKey="exam_student_id" />,
      </div>
    );
  }
  componentDidMount() {
    this.getExamList();
  }
  async getExamList() {
    const result = await _getExamList(localStorage.getItem("grade_id") as string);
    result.data.exam.forEach((item: any) => {
      item.grade_name = localStorage.getItem("grade_name") as string;
      item.status = item.status ? "已阅" : "未阅";
    });
    this.setState({
      list: result.data.exam,
    });
  }
  toStudentExamDetail(record: any) {
    this.props.history.push(`/home/studentexamdetail/${record.exam_student_id}`);
    localStorage.setItem("exam_student_id", record.exam_student_id);
  }
}

export default Waitclassmate;
