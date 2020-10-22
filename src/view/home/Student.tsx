import React, { Component } from 'react'
// import Laye from "@/components/laye"
import { Layout, Row, Col, Input } from "antd";
import "./class.css"
import { AudioOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"
import { Select, Button,Pagination,Table, Tag, Space} from 'antd';
import { _student,_del_student,_class,_subject, _grade} from "@/api/manger"

interface IObject{
    [keys:string]:any
}

const { Option } = Select;
const { Column, ColumnGroup } = Table;

const { Content, } = Layout;

const { Search } = Input;
const columns = [
    {
      title: 'student_name',
      dataIndex: 'student_name',
    },
    {
      title: 'student_id',
      dataIndex: 'student_id',
    },
    {
      title: 'grade_name',
      dataIndex: 'grade_name',
    },
    {
        title: 'room_text',
        dataIndex: 'room_text',
      },
      {
        title: 'student_pwd',
        dataIndex: 'student_pwd',
      },
      {
        title: '操作',
        dataIndex: 'subject_text',
      },
  ];
  let list1={
      a:'',
      b:'',
      c:''
  };
  
  let data: any[] | undefined = [
  ];
  
 
  

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
interface Iprops{
    history:any

}
interface Istate{
    list:any,
    current:number,
    StartEnd:number,
    end:number,
    newList:any[],
    list1:any,
    room:any,
    grade:any
}
// const onSearch = (value: any) => {
//     console.log(12)
// }

export default class Student extends Component<Iprops,Istate>{
    handleChange(value: any) {
        list1.b=value;
        // console.log(`selected ${value}`);
    }
    handleChangec(value: any) {
        list1.c=value;

        // console.log(`selected ${value}`);
    }

     
    state={
        list:[],
        current:1,
        StartEnd:0,
        end:9,
        newList:[],
        list1:"",
        room:[],
        grade:[]

    }
    


    componentDidMount(){
        this.student()
        this.class()
        this.grade()
    }
    change(e:any){
       list1.a=e.target.value
    }

    // async subject(){
    //     let res= await _subject();

        
    //     console.log(res.data.data)
    // }
     //获取班级接口
     async grade(){
        let res =   await _grade()
        this.setState({
            grade:res.data.data
        })
        console.log(res.data)
      }
  
      //获取教室接口
      async class(){
          let res = await _class()
          this.setState(
              {
                  room:res.data.data
              }
          )
          console.log(res.data)
      }


    async student(){
        let res = await _student()
        
        res.data.data?.forEach((item:any)=>{
            item.subject_text="删除"
        })
        // console.log(rcc)
        data = res.data.data
        this.setState({
            list:res.data.data,
        })

        // console.log(thi.state.list)
    }
    async del(student_id:string){
        
        await _del_student(student_id)
       this.props.history.go(0)
    }
    // onChange = (page: any) => { 
    //     console.log(page)
    //     let redat =this.state.list.slice((page-1)*this.state.end,10*page)
    //     this.setState({
    //       current: page,
    //       newList:redat
    //     });
    //     console.log(this.state.newList)
       
    //   };
    dsad=()=>{
        console.log(this.props.history.go(0))
    }
    red = () =>{
        this.student()
        console.log(this.state.list)
        let arr = []
        arr = this.state.list.filter((item:any) => {
            // return list1.a.length ? item.student_name.includes(list1.a) : '' ||
            // list1.b.length ? item.room_text.includes(list1.b) : '' ||
            // list1.c.length ? item.grade_name.includes(list1.c) : ''
            if(list1.a !== ''){
               return item.student_name.includes(list1.a)
            } 
            if(list1.b !== ''){
                return item.room_text.includes(list1.b)
            } 
            if(list1.c !== ''){
                return item.grade_name.includes(list1.c)
            }
            // return item.student_name.includes(list1.a)
        })
        this.setState({
            list : arr
        })
        setTimeout(() => {
            console.log(this.state.list);
        })
        // if(list1.a.length && list1.b.length && list1.c.length){
        //     
        // }


        // for(let k in (list1 as IObject)){
        //     if(list1[k])
        // }
        console.log(list1);
    
    }
    render() {
        // const stype="+ 添加课程"
        return (
            <div>
                <Layout>

                    <Content style={{ margin: "24px 16px 0" }}>

                        <div className="abc" style={{ padding: 24, background: "#fff", overflowY: "scroll" }}>
  
                                <Row>
                                    <Col span={6}><Input  onChange={this.change}></Input></Col>
                                    <Col span={5}>
                                        
                                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={ this.handleChange }>
                                        {
                                            this.state.room.map((item:any)=>{
                                            return  <Option value={item.room_text} >{item.room_text}</Option>
                                            })
                                        }
                                        
                                       
                                    </Select></Col>
                                    <Col span={5}><Select defaultValue="lucy" style={{ width: 120 }} onChange={ this.handleChangec }>
                                    {
                                            this.state.grade.map((item:any)=>{
                                            return  <Option value={item.grade_name} >{item.grade_name}</Option>
                                            })
                                    }
                                        {/* <Option value="Yiminghe">yiminghe</Option> */}
                                    </Select></Col>
                                    <Col span={5}> <Button type="primary" onClick={this.red}>搜索</Button></Col>
                                    <Col span={3}><Button type="primary" onClick={this.dsad}>重置</Button> </Col>
                                </Row>
                                <Table columns={columns} dataSource={data} size="middle"  onRow={record => {
                                return {
                                    onClick: event => {
                                    let tar = event.target
                                       if((tar as any).innerHTML="删除"){
                                        // console.log(record)
                                        this.del(record.student_id)
                                    }
                                    }, // 点击行
                                };
                            }} />
                                <div>
                                </div>
                                
                            <div>
                            
                            </div>
                           
                            
                </div>
                    </Content>

                </Layout>
            </div>
        )
    }
}
