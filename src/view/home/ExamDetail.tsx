import React, { Component } from 'react'
import {Button} from 'antd';
import {_show} from '@/api/exam';
export default class ExamDetail extends Component {
    render() {
        const key = (this.props as any).location.state.key;
        console.log(key);
        return (
            <div>
                <h2>试卷详情</h2>
                <Button onClick={()=>{(this.props as any).history.go(-1)}} type="primary">返回</Button>
                <div className="content">
                {
                    this.state.list.map((item:any,index:any) =>
                    {
                        return <div key={item.exam_id}>
                                    <p>{item.questions_stem}</p>
                                    <div style={{backgroundColor:'#ccc'}}>
                                        {item.questions_answer}
                                    </div>
                                </div>
                        })
                }
                </div>
             
            </div>
        )
    }
    state={
        list:[]
    }
    async componentDidMount()
    {
        console.log((this.props as any).location.state.key);
       let result = await _show((this.props as any).location.state.key);
        this.setState({
            list:result.data.data.questions
        })
    }
}
