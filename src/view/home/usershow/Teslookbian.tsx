import React, { Component } from 'react'
interface Iprops{
    //assgin记录浏览历史，所以可以实现后退功能
    //replace不记录浏览历史替换当前页，不能后退
    //reload()刷新页面,里面如果参数为true，强制刷新ctrl+f5
    location:any
}
interface Istate {
    location: any
}
export default class Teslookbian extends Component<Iprops, Istate> {
    state = {
        location: []
    }
    render() {
        console.log(this.props.location.state.obj)
        return (
            <div>
                编辑
            </div>
        )
    }
}
