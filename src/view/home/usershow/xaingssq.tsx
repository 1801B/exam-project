import React, { Component } from 'react'
interface Iprops {
    location: any
}
interface IArray {
    exam_id: string
    exam_name: string
    json_path: string
    questions_answer: string
    questions_id: string
    questions_stem: string
    questions_type_id: string
    questions_type_text: string
    subject_id: string
    subject_text: string
    title: string
    user_id: string
    user_name: string
}
interface Istate {
    location: any
    data: Array<IArray>
}
export default class xaingssq extends Component<Iprops, Istate> {
    state = {
        data: [],
        location: []
    }
    componentDidMount() {
        this.listdata()
    }
    listdata() {
        this.setState({
            data: this.props.location.state.obj
        })
    }
    render() {
            const { //exam_id,
                exam_name,
                //json_path,
                questions_answer,
                //questions_id,
                questions_stem,
                //questions_type_id,
                questions_type_text,
                //subject_id,
                subject_text,
                title,
                //user_id,
                user_name,} =this.props.location.state.obj[0]
        console.log(this.props.location.state.obj)
        return (
            <div className="xaingssq">
                 <div className="xaingssq2">
                            <div className="left">
                    <p>出题人：{user_name}</p>
                                <p>题目信息</p>
                                <p>
                                    <span className="exam_name">{exam_name} </span>
                                    <span className="questions_type_text">{questions_type_text}</span>
                                    <span className="subject_text">{subject_text}</span>
                                </p>
                    <p>{title}</p>
                                <p>{questions_stem}
                               </p>
                                <p>实列1：</p>
                                <dl>
                                    <dt>输入: "UD"</dt>
                                    <dt>输出: "true"</dt>
                                    <dt>解释: "机器人向上移动一次，然后向下移动一次。
                                        所有动作都具有相同的幅度，因此它最终回到
                                        它开始的原点。因此，我们返回 true。"</dt>
                                </dl>
                                <p>实列2：
                               <dl>
                                        <dt>输入: "LL"</dt>
                                        <dt>输出: "false"</dt>
                                        <dt>解释: "机器人向左移动两次。它最终位于原点的左侧，
                                            距原点有两次 “移动” 的距离。我们返回 
                                            false，因为它在移动结束时没有返回原点。"</dt>
                                    </dl>
                                </p>
                                <p>
                                    注意：机器人“面朝”的方向无关紧要。
                                    “R” 将始终使机器人向右移动一次，“L” 将始终向左移动等。
                                    此外，假设每次移动机器人的移动幅度相同。
                               </p>
                                <p>请根据题意在横线处填写合适的代码：</p>
                                <p>{questions_answer} </p>
                            </div>
                            <div className="right">
                                <p>答案信息</p>
                                <p>{questions_answer} </p>
                            </div>
                        </div>
            </div>

        )
    }
}

