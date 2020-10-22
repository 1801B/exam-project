/*
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 * @Descripttion : 
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-21 19:01:53
 * @FilePath     : \src\view\home\Testlook.tsx
 */
import React, { Component } from 'react'
import { _room, _grade, _zhou, _sou } from "../../api/apiss"
interface Imsg {
    subject_text: string,
    subject_id: string,
    index: number
}
interface Zhou {
    questions_type_id: string,
    questions_type_text: string,
    questions_type_sort: number,
}
interface lei {
    exam_id: string,
    exam_name: string
}
interface huan {
    exam_name: string  //"周考1"
    questions_id: string  //"4t0rar-39c33-wq098t-phh5ht"
    questions_type_text: string // "代码补全"
    subject_text: string  //"javaScript上"
    title: string  //"机器人归位"
    user_name: string  //"dingshaoshan"
}
interface IState {
    getdata: Array<Imsg>;//数组
    tabIndex: number;
    zhouData: Array<Zhou>
    leiData: Array<lei>
    fenData: Array<huan>
}
export default class Testlook extends Component<any, IState> {
    state = {
        getdata: [],
        tabIndex: 0,
        zhouData: [],
        leiData: [],
        fenData: []
    }
    componentDidMount() {
        this.getList()
        this.zhouList()
        this.leiList()
        this.fenList()
    }
    async getList() {
        let res = await _room()
        this.setState({
            getdata: res.data.data
        })
    }
    async zhouList() {
        let res = await _grade();
        this.setState({
            zhouData: res.data.data
        })
    }
    async leiList() {
        let res = await _zhou();
        this.setState({
            leiData: res.data.data
        })
    }
    async fenList() {
        let res = await _sou();
        this.setState({
            fenData: res.data.data
        })
        console.log(this.state.fenData)
    }
    tab(index: number) {
        this.setState({
            tabIndex: index
        })
    }
    render() {
        return (
            <div className="Testlook">
                <div className="shang">
                    <p className="p1">课程类型:{
                        this.state.getdata.map((item: Imsg, index: number) => {
                            return (
                                <span className={this.state.tabIndex === index ? "active" : ""} onClick={() => this.tab(index)} key={index}>{item.subject_text}</span>
                            )
                        })} </p>
                    <p className="p2"><span>考试类型:</span>
                        <select className="xiala2">
                            {
                                this.state.leiData.map((item: lei, index: number) => {
                                    return (
                                        <option key={index}>{item.exam_name}</option>
                                    )
                                })
                            }
                        </select>
                        <span> 题目类型:</span>
                        <select className="xiala1">
                            {
                                this.state.zhouData.map((item: Zhou, index: number) => {
                                    return (
                                        <option key={index}>{item.questions_type_text}</option>
                                    )
                                })
                            }
                        </select>
                        <button>查询</button>
                    </p>
                </div>
                <div className="xia">
                    {
                        this.state.fenData.map((item: huan, index: number) => {
                            return (
                                <div className="lie" key={index}>
                                    <div className="dev">
                            <p>{item.title}</p>
                                        <p> <span>{item.exam_name} </span> 
                                         <span>{item.questions_type_text}</span> <span>{item.subject_text}</span></p>
                                        <p> <a href=""> {item.user_name} 发布着</a> </p>
                                    </div>
                                    <div className="de2">
                                        <span>编辑</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

