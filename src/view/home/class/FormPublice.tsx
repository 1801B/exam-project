import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Select, } from 'antd';
import {_class,_subject, _grade,_updata} from '@/api/manger'
//
import { FormInstance } from 'antd/lib/form/Form';
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
interface Iprops{
  list:any;
  subject:any;
  room:any
}

class FormPublice extends Component<Iprops>{
  state={
    subject:[],
    room:[],
    list:[]
  }
 
    formRef = React.createRef<FormInstance>();
  onGenderChange = (value: string) => {
    this.formRef.current?.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  onFinish = (values: any) => {

    console.log(values.subject_id);

    this.updata(values)
  };
  onReset = () => {
    this.formRef.current?.resetFields();
  };
  onFill = () => {
    this.formRef.current?.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  async grade(){
    let res =   await _grade()
    this.setState({
        list:res.data.data
    })
    console.log(this.state.list)
  }
  
    
  
  componentDidMount(){
    this.class()
    this.subject()
    this.grade()
  }
  async updata(values:any){
    console.log(this.state,values)
    let grade=this.state.list.filter((item:any)=>{
      return  item.grade_name===values.grade_name;
    })
    let room=this.state.room.filter((item:any)=>{
      return  item.room_text===values.room_id;
    })
    let subject=this.state.subject.filter((item:any)=>{
      return  item.subject_text===values.subject_id;
    })
    let room_id = (room as any)[0].room_id
    let subject_id = (subject as any)[0].subject_id
    let grade_id=(grade as any)[0].grade_id
    console.log(grade_id,subject_id,room_id)
    // console.log('*******');
    // console.log(values);
    // //{grade_name: "1611B", room_id: "34303", subject_id: "javaScript下"}
    // console.log('*******');

    await _updata(grade_id,subject_id,grade_id)
  }
  async class(){
    let res = await _class()
    this.setState(
        {
            room:res.data.data
        }
    )
  }
  async subject(){
    let res= await _subject();

    this.setState({
        subject:res.data.data
    })
}

    render() {
        return (
            <div>
                 <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item
          name="grade_name"
          label="班级"
          
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={this.props.list[0].grade_name} />
        </Form.Item>
        <Form.Item
          name="room_id"
          label="教室号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder={this.props.list[0].room_text}
            onChange={this.onGenderChange}
            allowClear
          >
            {
              this.state.room.map((item:any)=>{
                 return <Option value={item.room_text} key ={item.room_id}>{item.room_text}</Option>
              })
            }

          </Select>
        </Form.Item>
        <Form.Item
          name="subject_id"
          label="课程"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder={this.props.list[0].subject_text}
            onChange={this.onGenderChange}
            allowClear
          >
           {
              this.state.subject.map((item:any)=>{
                 return <Option value={item.subject_text} key ={item.room_id}>{item.subject_text}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) => {
            return getFieldValue('gender') === 'other' ? (
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
  
        </Form.Item>
      </Form>
                
            </div>
        );
    }
}

export default FormPublice;