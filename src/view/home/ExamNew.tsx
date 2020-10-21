import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import { Modal, Button,Select,Form, Tag } from 'antd';
import {_getQuestionType,_getTestList,_search} from '@/api/exam';


@inject("testPaper")
@observer
export default class ExamNew extends Component {
    render() {
        const { examType,courseType} = (this.props as any).testPaper;
        return (
            <div className="exam_big">
                 <div className="exam_small">
                 <Button type="primary" onClick={this.showModal} style={{marginTop:10,marginLeft:10}}>
                       + 添加新题
                 </Button>
                   <h3 style={{textAlign:"center"}}>{(this.props as any).location.state.title}</h3>
                   <div style={{textAlign:"center",margin:0}}>
                      <span>考试时间：1小时30分钟 监考人：刘于 开始考试时间:{(this.props as any).location.state.time} 阅卷人：刘于</span>
                   </div>
                   {/* 获取详情 */}
                 
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
               {courseType.slice().map((item: any,index:any) => {
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
                  style={{ display: "inline-flex",marginLeft:10}}
                  label="题目类型"
                  rules={[{ required: true }]}
                >
                   <Select style={{width:120,marginLeft:10, display: "inline-flex"}} onChange={this.handleChangeTitle}>
                   {this.state.subjectType.map((item: any) => {
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
             <div className="allTest">
               {
                 this.state.allTest.map((item:any)=>
                 {
                    return  <dl key={item.questions_type_id}>
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
             </div>

        </Modal>
       </div>
       <Modal
          visible={this.state.flag}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            this.state.filterData.map((ite:any) =>
            {
              return  <div style={{border:'1px solid #ccc',marginTop:20}}>
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
        title:''
     }
     addDetail(id:any)
     {
        console.log(id);
     }
    changeIndex(index:any)
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
      handleChangeTest=(value: any)=> {
        this.setState({
            test:value
        })
      }
      handleChangeTitle=(value: any)=> {
        this.setState({
          title:value
      })
      }
      async searchTest()
      {
         let subject_id=(this.props as any).testPaper.courseType[this.state.initNum].subject_id;
        
         let exam_id=((this.props as any).testPaper.examType.filter((item:any) => (item as any).exam_name===this.state.test)[0] as any).exam_id;
       
        let questions_type_id=(this.state.subjectType.filter(item =>(item as any).questions_type_text===this.state.title)[0] as any).questions_type_id;
          //获取数据进行相应搜索  调用接口
         
          const result=await _search(subject_id,
            exam_id,
            questions_type_id);
          console.log(result)
            this.setState({
              allTest:result.data.data
            })
          
          }
      showDetail(id:string)
      {
        console.log(id);
        //点击出现一个弹框 +form表单
         this.setState({
             flag:true,
             filterData:this.state.allTest.filter((item:any) =>
                        {
                          return item.questions_id===id
                        })
         })
      }
      async componentDidMount()
      {
          let res=await _getTestList();
          this.setState({
            allTest:res.data.data
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
