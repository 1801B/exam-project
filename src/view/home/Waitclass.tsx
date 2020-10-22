import React, { Component } from "react";
import { _getGrade } from "../../api/waitclass";
import { Table, Space } from "antd";
interface IProps {
  [key: string]: any;
}
interface IState {
  list: any[];
  columns: any;
}
class Waitclass extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      list: [],
      columns: [
        {
          title: "班级名",
          dataIndex: "grade_name",
          key: "1",
        },
        {
          title: "课程名称",
          dataIndex: "subject_text",
          key: "2",
        },
        {
          title: "阅卷状态",
          dataIndex: "address",
          key: "3",
        },
        {
          title: "课程名称",
          dataIndex: "subject_text",
          key: "4",
        },
        {
          title: "成材率",
          dataIndex: "room_text",
          key: "5",
        },
        {
          title: "操作",
          key: "",
          render: (text: any, record: any) => (
            <Space size="middle">
              <span
                onClick={() => {
                  this.toClassMate(record);
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
      <div className="waitclass">
        <Table columns={this.state.columns} dataSource={this.state.list} rowKey="grade_id" />,
      </div>
    );
  }
  async componentDidMount() {
    this.getGrade();
  }
  async getGrade() {
    const result = await _getGrade();
    this.setState({
      list: result.data.data,
    });
  }
  toClassMate(record: any) {
    this.props.history.push({
      pathname: "/home/waitclassmate",
    });
    localStorage.setItem("grade_id", record.grade_id);
    localStorage.setItem("grade_name", record.grade_name);
  }
}
export default Waitclass;
