import React, { Component } from 'react';
import {_getStudentExamDetail,_editStudentExam} from '@/api/waitclass'
import Markdown from 'react-markdown'
import { Divider,Button ,Row, Col,Slider,Modal} from 'antd';
interface IProps{
    [key:string]:any
}
interface IState{
    detailData:any,
    inputValue:number,
    visible:boolean,
    flag:boolean
}
class StudentExamDetail extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)
        this.state = {
            detailData:{},
            inputValue: 1,
            visible: false,
            flag:false

        }
    }
    render() {
        console.log(this.state.detailData)
        const {detailData} = this.state
        return (
            <div>
                <p style={{margin:"10px 0 10px 20px",fontSize:"30px"}}>阅卷</p>
                <div className="studentExamDetailMenu" >
                    {
                        detailData.questions && detailData.questions.map((item:any,index:number) => {
                            return <div className="studentExamDetailItem" key={item.questions_id} >
                                <div>{index+1}、{item.title}<span>{item.questions_type_text}</span></div>
                                <div><Markdown source={item.questions_stem}/></div>
                                <div className="studentExamDetailItemAnswer" >
                                    <div className="studentExamDetailItemAnswerLeft" >
                                         <Divider plain>学生答案</Divider>
                                         <div>
                                             {item.student_answer}
                                         </div>
                                    </div>
                                    <div className="studentExamDetailItemAnswerRight" >
                                         <Divider plain>标准答案</Divider>
                                         <div>
                                             <Markdown source={item.questions_answer}/>  
                                         </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="studentExamDetailMark">
                    <p>{detailData.student_name}</p>
                    <p>得分：{this.state.inputValue}</p>
                    <div>
                    <Row>
                        <Col span={12}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={this.onChange}
                            value={typeof this.state.inputValue === 'number' ? this.state.inputValue : 0}
                        />
                        </Col>
                    </Row>
                    </div>
                    <p><Button type="primary" onClick={this.showModel}>确定</Button></p>
                </div>
                <Modal
                title="确定提交分数吗"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>分数是{this.state.inputValue}</p>
                </Modal>
                <Modal
                title="批卷结果"
                visible={this.state.flag}
                onOk={this.Ok}
                onCancel={this.Cancel}
                >
                <p>批改试卷成功 {detailData.student_name}得分{this.state.inputValue}</p>
                </Modal>
            </div>
            
        );
    }
    componentDidMount(){
        this.getStudentExamDetail(localStorage.getItem('exam_student_id') as string)
    }
    async getStudentExamDetail(exam_student_id:string|number){
        const result = await _getStudentExamDetail(exam_student_id)
        this.setState({
            detailData:result.data.data
        })
    }
    onChange = ( value:any ) => {
        this.setState({
            inputValue: value,
        });
    }
    handleOk = (e:any) => {
        this.setState({
            visible: false,
            flag:true
        });
    };

    handleCancel = (e:any) => {
        this.setState({
            visible: false,
        });
    };
    showModel = () => {
        this.setState({
            visible: true,
        });
    }
    Ok = (e:any) => {
        this.setState({
            flag: false,
        });
        _editStudentExam(localStorage.getItem('exam_student_id') as string,this.state.inputValue)
        this.props.history.push('/home/waitclassmate')
    };

    Cancel = (e:any) => {
        this.setState({
            flag: false,
        });
    };
}

export default StudentExamDetail;