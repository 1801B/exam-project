import React, { Component } from "react";
import { Table, Form, Select, Button } from "antd";
import { inject, observer } from "mobx-react";

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}
interface IProps{
  testPaper?:any
}
@inject("testPaper")
@observer
class Examlist extends Component<Item> {
  render() {
    const { examType,courseType,realCourseList } = (this.props as any).testPaper;
    return (
      <div className="big-test">
        <h3>试卷列表</h3>
        <div className="test-header">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item>
              <Form.Item
                label="考试类型"
                style={{
                  display: "inline-flex",
                  width: "calc(30%)",
                  paddingTop: 50,
                }}
              >
                <Select
                  style={{ width: 120, marginLeft: -50 }}
                  onChange={this.changeCourse}
                >
                  {examType.map((item: any) => {
                    return (
                      <Select.Option value={item.exam_name} key={item.exam_id}>
                          {item.exam_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="课程"
                style={{
                  display: "inline-flex",
                  width: "calc(30%)",
                  paddingTop: 50,
                }}
              >
                <Select
                  style={{ width: 120, marginLeft: -70 }}
                  onChange={this.handleChange}
                >
                 {courseType.map((item: any) => {
                    return (
                      <Select.Option value={item.subject_text} key={item.subject_id}>
                          {item.subject_text}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ display: "inline-flex", width: 100, paddingTop: 50 }}
              >
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Form.Item>
          </Form>
        </div>
        <div className="test">
          <p>试卷列表</p>
          <Table
            rowClassName={() => "editable-row"}
            bordered
            dataSource={realCourseList.slice()}
            columns={this.state.columns}
          />
        </div>
      </div>
    );
  }
  state = {
    dataSource:[],
    columns: [
      {
        title: "试卷信息",
        dataIndex: "name",
      },
      {
        title: "班级",
        dataIndex: "grade",
      },
      {
        title: "创建人",
        dataIndex: "person",
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
      },
      {
        title: "操作",
        dataIndex: "operation",
        render: (text: any, record: any,index:any) =>
          this.state.dataSource.length<1 ? <span onClick={()=>{this.goDetail(text,record,index)}} style={{color:'skyblue'}}>详情</span> : null,
      },
    ],
    count: 2,
  };
  changeCourse = (value: any) => {
    console.log(`selected course ${value}`);
  };
  async componentDidMount() {
    //获取考试类型数据
    (this.props as any).testPaper.getExamType();
    (this.props as any).testPaper.allCourseType();
    (this.props as any).testPaper.allCourseList();
  }
  handleChange = (value: any) => {
    console.log(`selected course ${value}`);
  };
  onFinish = (values: any) => {
    console.log("Success:", values);
  };
  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  goDetail=(text: any,record:any,index:Number)=>{
  
    
      //跳转详情
     
      (this.props as any).history.push({
         pathname:'/home/examDetail',
         state:{
                  key:record.key
               }
      })
    
  }
}

export default Examlist;
