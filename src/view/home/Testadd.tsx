/*
 * @Descripttion :
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-22 15:44:29
 * @FilePath     : \src\view\home\Testadd.tsx
 */

import React, { Component } from 'react'
import { _room, _grade, _zhou, _tianjia } from "../../api/apiss"
//映入wangeditor 插件 
import E from "wangeditor"
interface zhouDatas {
    questions_type_id: string,
    questions_type_text: string,
    questions_type_sort: number,
}
interface tiDataS {
    exam_id: string,
    exam_name: string
}
interface xiuDataS {
    subject_text: string,
    subject_id: string,
    index: number,
}
interface State {
    list: Array<any>;
    tg: string
    zhouData: Array<zhouDatas>
    tiData: Array<tiDataS>
    xiuData: Array<xiuDataS>
}

let editor: E | null = null
//声明他一下
let editor1: E | null = null
export default class Testques extends Component<any, State> {
    // constructor(props: any) {
    //     super(props)
    // }
    state = {
        list: [],
        tg: '',
        zhouData: [],
        tiData: [],
        xiuData: []

    }
    xiala1 = ""
    xiala2 = ""
    xiala3 = ""
    componentDidMount() {
        //在挂载前找到他
        editor = new E("#box1")
        //然后实列他
        editor1 = new E("#box2")
        //创作一个对象
        editor.create()
        editor1.create()
        this.getList()
        this.zhouList()
        this.leiList()
    }
    async getList() {
        let res = await _zhou()
        //周考
        console.log(res.data.data)
        this.setState({
            zhouData: res.data.data
        })
    }
    async zhouList() {
        let res = await _grade();
        //题型
        console.log(res.data.data)
        this.setState({
            tiData: res.data.data
        })
    }
    async leiList() {
        let res = await _room();
        //课程
        console.log(res.data.data)
        this.setState({
            xiuData: res.data.data
        })
    }
    inputChange(e: InputEvent) {
        let el = (e.target as any).value;
        this.setState({
            tg: el
        })
    }
    async getInputValue() {
        let title = this.state.tg
        let exam_id = (this.xiala1 as any).value;
        let subject_id = (this.xiala2 as any).value;
        let questions_type_id = (this.xiala3 as any).value;
        //获取他的文本节点 
        let questions_answer = (editor as E).txt.text();
        let questions_stem = (editor1 as E).txt.text();
        // console.log(exam_id, subject_id, this.state.tg, questions_type_id, (editor as E).txt.text(), (editor1 as E).txt.text())
        let res = await _tianjia(title,exam_id,subject_id,questions_type_id,(questions_answer as string),(questions_stem as string))
        console.log(res)
    }
    render() {
        return (
            <div className="Testadd">
                <p>题目信息</p>
                <p>题干</p>
                <p> <input value={this.state.tg} onChange={(e) => this.inputChange(e as any)}></input> </p>

                <p>题目主题</p>
                <div id="box1"></div>
                <p>
                    请选择考试类型： <select className="xiala1" ref={(el) => { (this.xiala1 as any) = el }}>
                        {
                            this.state.zhouData.map((item: tiDataS, index: number) => {
                                return (
                                    <option value={item.exam_id} key={index}>{item.exam_name}</option>
                                )
                            })
                        }
                    </select>
                </p>
                <p> 请选择课程类型：  <select className="xiala2" ref={(el) => { (this.xiala2 as any) = el }}>
                    {
                        this.state.xiuData.map((item: xiuDataS, index: number) => {
                            return (
                                <option value={item.subject_id} key={index}>{item.subject_text}</option>
                            )
                        })
                    }
                </select>
                </p>
                <p> 请选择题目类型：  <select className="xiala3" ref={(el) => { (this.xiala3 as any) = el }}>
                    {
                        this.state.tiData.map((item: zhouDatas, index: number) => {
                            return (
                                <option value={item.questions_type_id} key={index}>{item.questions_type_text}</option>
                            )
                        })
                    }
                </select>
                </p>
                <div id="box2"></div>
                <p><button onClick={() => this.getInputValue()}>提交</button></p>
            </div>
        )
    }
}
