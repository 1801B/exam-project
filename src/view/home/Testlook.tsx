/*
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-23 16:41:46
 * @FilePath     : \src\view\home\Testlook.tsx
 */
import React, { Component, createRef } from 'react'
import { _room, _grade, _zhou, _sou, _cha ,_chaid} from "../../api/apiss"
interface Imsg {
    subject_text: string,
    subject_id: string,
    index: number,

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
    qusestions_type_id: string,
    exam_id: string,
    subject_id: string

}
interface IState {
    getdata: Array<Imsg>;//数组
    tabIndex: number;
    zhouData: Array<Zhou>
    leiData: Array<lei>
    fenData: Array<huan>
    questions_ids: string

}
export default class Testlook extends Component<any, IState> {
    // constructor(props: any) {
    //     super(props)
    // }
    state = {
        getdata: [],
        tabIndex: 0,
        zhouData: [],
        leiData: [],
        fenData: [],
        questions_ids: ""
    }
    xiala1 = ''
    // 创建Ref
    xiala2 = createRef()
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
    }
    tab(index: number) {
        this.setState({
            tabIndex: index
        })
    }
    async cha() {
        let questions_type_id = (this.xiala1 as any).value
        // (this.xiala2.current as HTMLSelectElement) 断言xiala2的current是：select 元素，然后就能获取到value
        let exam_id = (this.xiala2.current as HTMLSelectElement).value
        let subject_id = (this.state.getdata[this.state.tabIndex] as any).subject_id
        const res = await _cha(questions_type_id, exam_id, subject_id)
        this.setState({
            fenData:res.data.data
         }) 
    }
   async xian(questions_id: string) {
        this.setState({
            questions_ids: questions_id
        })
        const res = await _chaid(questions_id)
            this.props.history.push({
                pathname: "/home/usershow/xaingssq",
                state: {
                    obj:res.data.data
                } 
              })
    }
    async  bianji(questions_id:string){
        const res = await _chaid(questions_id)
        this.props.history.push({
            pathname: "/home/usershow/Teslookbian",
            state: {
                obj:res.data.data
            } 
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
                        {/* 在select上写入ref，断言xiala2的类型为：React.RefObject<HTMLSelectElement> */}
                        <select className="xiala2" ref={(this.xiala2 as React.RefObject<HTMLSelectElement>)}>
                            {
                                this.state.leiData.map((item: lei, index: number) => {
                                    return (
                                        <option value={item.exam_id} key={index}>{item.exam_name}</option>
                                    )
                                })
                            }
                        </select>
                        <span> 题目类型:</span>
                        <select className="xiala1" ref={(el) => { (this.xiala1 as any) = el }}>
                            {
                                this.state.zhouData.map((item: Zhou, index: number) => {
                                    return (
                                        <option key={index} value={item.questions_type_id}>{item.questions_type_text}</option>
                                    )
                                })
                            }
                        </select>
                        <button  className='gzk-btn' onClick={() => { this.cha()}}>查询</button>
                    </p>
                </div>
                <div className="xia">
                    {
                        this.state.fenData.map((item: huan, index: number) => {
                            return (
                                <div className="lie"  key={index}>
                                    <div onClick={() => this.xian(item.questions_id)} className="dev">
                                        <p>{item.title}</p>
                                        <p>
                                            <span className="exam_name">{item.exam_name} </span>
                                            <span className="questions_type_text">{item.questions_type_text}</span>
                                            <span className="subject_text">{item.subject_text}</span>
                                        </p>
                                        <p> <span className="user_name"> {item.user_name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 发布者</span> </p>
                                    </div>
                                    <div className="de2">
                                        <span onClick={()=>this.bianji(item.questions_id)} >编辑</span>
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

