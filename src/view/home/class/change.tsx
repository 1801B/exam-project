import React, { Component } from 'react'
import 'antd/dist/antd.css';
import FormPublice from "./FormPublice"
import { Modal } from 'antd';

interface Iprops{
  change:any;
  id:string;
  list:any;
  subject:any;
  room:any
}



export default class change extends Component<Iprops> {
    state = { 
      visible: false ,
      list:[]
    };
    constructor(props:any){
      super(props)
     
    }
  showModal = (e:any[],id:string) => {
    let b =e.filter((item:any)=>{
      return item.grade_id===id
    })
    this.setState({
      visible: true,
      list:b
    });
  };
  handleOk = (e: any) => {

    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };
    render() {
      console.log(this.props.room,this.props.subject)
        return (
            <span onClick={()=>{this.showModal(this.props.list,this.props.id)}}>
                <span onClick={()=>this.props.change(this.props.id)}>
                编辑
                </span>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >



          
         <FormPublice list={this.state.list} room = {this.props.room}    subject={this.props.subject}/>
        </Modal>
            </span>
        )
    }
}

