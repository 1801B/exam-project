/*
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-23 16:19:17
 * @FilePath     : \src\view\home\Testlist.tsx
 */

import React, { Component } from 'react'
import { _grade, _leixing,_tianjisass } from "../../api/apiss"
interface Imsg {
    questions_type_id: string,
    questions_type_text: string,
    questions_type_sort: number,
}
interface IState {
    tg: string,
    show: boolean,
    gradedata: Array<Imsg>//数组
}
export default class Testlist extends Component<any, IState>{
    state = {
        tg: "",
        show: false,
        gradedata: []
    }
    async bian(questions: string) {
        let res = await _leixing(questions)
        if (res.data.code) {
            alert(res.data.msg)
        }
    }
    componentDidMount() {
        this.getList()
    }
    getList = async () => {
        let res = await _grade();
        this.setState({
            gradedata: res.data.data
        })
    }
    inputChange(e: InputEvent) {
        let el = (e.target as any).value
        this.setState({
            tg: el
        })
    }
    async qd() {
        this.setState({
            show: false
        })
        let res = await _tianjisass(this.state.tg,"");
        console.log(res)
    }
    ying() {
        this.setState({
            show: true
        })
    }
    qx() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="Testlist">
                <div className="shang">
                    <p><button onClick={() => this.ying()}>十添加类型</button> </p>
                </div>
                <div className="xia">
                    <table>
                        <thead>
                            <tr>
                                <th>类型ID</th>
                                <th>类型名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //item:Imsg 如果不写就会报错
                                this.state.gradedata.map((item: Imsg, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{item.questions_type_id}</th>
                                            <th>{item.questions_type_text} </th>
                                            <th><button onClick={() => this.bian(item.questions_type_id)}>删除</button> </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="tan" style={{ display: this.state.show ? 'block' : "none" }}>
                    <div className="ds">
                        <p>创建新类型</p>
                        <p><input placeholder="请输入类型" value={this.state.tg} onChange={(e) => this.inputChange(e as any)}></input> </p>
                        <p> <button className="qd" onClick={() => this.qd()}> 确定</button>  <button onClick={() => this.qx()}>取消</button> </p>
                    </div>
                </div>
            </div>
        )
    }

}
