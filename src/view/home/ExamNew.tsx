import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Modal, Button,Select,Form, Tag } from 'antd';
import {_getQuestionType,_getTestList,_search,_updateTest} from '@/api/exam';
interface IProps
{
  location:IItem;
  testPaper:any;
   [key:string]:any
}
interface IItem
{
  questions_id:string;
  subject_id:string;
  subject_text:string;
  exam_name:string;
  questions_type_text:string;
  questions_type_id:string;
  title:string;
  state:any;
  questions_stem:string;
  questions_answer:string;
  exam_id:string;
  user_name:string;
  exam_exam_id:string;
}

@inject("testPaper")
@observer
export default class ExamNew extends Component<IProps> {
    render() {
        const { examType,courseType} = this.props.testPaper;
        return (
            <div className="exam_big">
                 <div className="exam_small">
                 <Button type="primary" onClick={this.showModal} style={{marginTop:10,marginLeft:10}}>
                       + 添加新题
                 </Button>
                   <h3 style={{textAlign:"center"}}>{this.props.location.state.title}</h3>
                   <div style={{textAlign:"center",margin:0}}>
                      <span>考试时间：1小时30分钟 监考人：刘于 开始考试时间:{this.props.location.state.time} 阅卷人：刘于</span>
                   </div>
                   {/* 获取详情 */}
                   <div className='allList'>
                   {
                        this.state.allTestList.map((ite:IItem,index:number) =>
                        {
                            return  <div style={{border:'1px solid #ccc',marginTop:20,position:'relative'}} key={ite.questions_id}>
                                          <div style={{position:'absolute',right:10,top:10,color:'#00f'}} onClick={()=>{this.delItem(index)}}>删除</div>
                                          <p>{ite.title}</p>
                                          <p>
                                              {ite.questions_stem}
                                          </p>
                                          <p style={{backgroundColor:'#ccc',marginTop:10}}>
                                              {ite.questions_answer}
                                          </p>
                                  </div>
                        })
                     }
                   </div>
                  <Button type="primary" onClick={()=>{this.createTest()}}>创建试卷</Button>
        <Modal
          title="所有题目"
          visible={this.state.visible}
          className="model"
          footer={false}
        >
           <Button type="primary" onClick={()=>{this.setState({visible:false})}} style={{position:'absolute',right:0,top:10}}>点击取消</Button>
            <div>
            {/* 课程类型 */}
               <span>课程类型</span>
                <span style={{marginLeft:20}}>全部</span>
               {courseType.slice().map((item:IItem,index:Number) => {
                    return (
                      <span  
                         key={item.subject_id} 
                         style={{marginLeft:10}} 
                         className={this.state.initNum===index?'active':''}
                         onClick={()=>{this.changeIndex(index)}}
                         >
                          {item.subject_text}
                      </span>
                    );
                  })}
            </div>
             <div>
                 {/* 考试类型，题目类型，查询 */}
                  <Form style={{marginTop:20}}>
                  <Form.Item 
                  label="考试类型"
                  style={{ display: "inline-flex"}}
                  >
                    <Select  style={{ width: 120,  display: "inline-flex"}} onChange={this.handleChangeTest}>
                            {examType.map((item: IItem,index:string | number | undefined) => {
                            return (
                            <Select.Option value={item.exam_name} key={index}>
                                {item.exam_name}
                            </Select.Option>
                            );
                        })}
                    </Select>
            </Form.Item> 
                  <Form.Item
                  style={{ display: "inline-flex",marginLeft:10}}
                  label="题目类型"
                  rules={[{ required: true }]}
                >
                   <Select style={{width:120,marginLeft:10, display: "inline-flex"}} onChange={this.handleChangeTitle}>
                   {this.state.subjectType.map((item: IItem) => {
                    return (
                      <Select.Option value={item.questions_type_text} key={item.questions_type_id}>
                          {item.questions_type_text}
                      </Select.Option>
                    );
                  })}
                    </Select>
                </Form.Item>
                 <Form.Item style={{ display: "inline-flex",marginLeft:10}}>
                      <Button type="primary" htmlType="submit" onClick={()=>{this.searchTest()}}>
                          查询
                      </Button>
                </Form.Item>
                  </Form>
             </div>
             {
               this.state.allTest.length?<div className="allTest">
               {
                 this.state.allTest.map((item:IItem,index:string | number | null | undefined)=>
                 {
                    return  <dl key={index}>
                                <dt>
                                    <p>{item.title}</p>
                                     <div>
                                         <Tag color="success">{item.questions_type_text}</Tag>
                                          <Tag color="processing">{item.subject_text}</Tag>
                                          <Tag color="error">{item.exam_name}</Tag>
                                     </div>
                                      <p>{item.user_name}发布</p>
                                </dt>
                                <dd>
                                      <span style={{color:'skyblue'}} onClick={()=>{this.addDetail(item.questions_id)}}>添加</span>
                                      <span style={{marginLeft:10,color:'skyblue'}} onClick={()=>{this.showDetail(item.questions_id)}}>详情</span>
                                </dd>
                            </dl>
                 })
               }
             </div>:'暂无数据'
             }
        </Modal>
       </div>
       <Modal
          visible={this.state.flag}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            this.state.filterData.map((ite:IItem) =>
            {
              return  <div style={{border:'1px solid #ccc',marginTop:20}} key={ite.questions_id}>
                            <p>{ite.title}</p>
                            <p>
                                {ite.questions_stem}
                            </p>
                             <p style={{backgroundColor:'#ccc',marginTop:10}}>
                                {ite.questions_answer}
                            </p>
                      </div>
            })
          }
        
        </Modal>
            </div>
        )
    }
    state = { 
        visible: false,
        initNum:0,
        subjectType:[],
        allTest:[],
        columns:[],
        flag:false,
        filterData:[],
        test:'',
        title:'',
        allTestList:[]
     }
     async createTest()
     {
        //创建试卷 获取所有的数据列表进行相应创建
        let arr:any=[];
        this.state.allTestList.forEach((item:any) =>
        {
            arr.push(item.questions_id)
        })
        let res=await _updateTest(arr,this.props.location.state.exam_exam_id);
        console.log(res)
        if(res.data.code===1)
        {
          this.props.history.push('/home/examlist')
        }
        
     }
     delItem(index:number)
     {
         this.state.allTestList.splice(index,1);
         this.setState({
          allTestList:this.state.allTestList
         })
     }
     addDetail=(questionId:string)=>
     {
       //添加
       let result=this.state.allTest.filter((item:IItem) =>
                        {
                          return item.questions_id===questionId
                        })[0];
        this.state.allTestList.push(result);
       
     }
    changeIndex(index:Number)
    {
        this.setState({
            initNum:index
        })
    }
     showModal = async() => {
        this.setState({
          visible: true,
        });
        let res=await _getQuestionType();
        this.setState({
          subjectType:res.data.data
        })
      };
      showDialog=() =>
      {
        this.setState({
            visible:!this.state.visible
        })
      }
      handleChangeTest=(value:Object)=> {
        this.setState({
            test:value
        })
      }
      handleChangeTitle=(value: Object)=> {
        this.setState({
          title:value
      })
      }
      async searchTest()
      {
         let subject_id=this.props.testPaper.courseType[this.state.initNum].subject_id;
        
         let exam_id=(this.props.testPaper.examType.filter((item:IItem) => item.exam_name===this.state.test))[0].exam_id;
       
        let questions_type_id=(this.state.subjectType.filter((item:IItem) =>item.questions_type_text===this.state.title)[0] as any).questions_type_id;
          //获取数据进行相应搜索  调用接口
         
          const result=await _search(subject_id,
            exam_id,
            questions_type_id);
            this.setState({
              allTest:result.data.data
            })
            console.log(this.state.allTest);
          }
      showDetail(id:string)
      {
        console.log(id);
        //点击出现一个弹框 +form表单
         this.setState({
             flag:true,
             filterData:this.state.allTest.filter((item:IItem) =>
                        {
                          return item.questions_id===id
                        })
         })
      }
      async componentDidMount()
      {
          let res=await _getTestList();
          this.setState({
            allTest:res.data.data,
            questions:this.props.location.state.questions
          })
      }
      handleOk = () => {
        this.setState({
          flag: false,
        });
      };
    
      handleCancel = () => {
        this.setState({
          flag: false,
        });
      };
    }
