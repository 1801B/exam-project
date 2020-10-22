import React, { Component } from "react";
import { Button } from "antd";
import { _show } from "@/api/exam";
interface IProps
{
    history:IItem;
    location:IItem;
}
interface IItem
{
    push:any;
    questions_id:string;
    questions_stem:string;
    state:any;
    questions_answer:string;
}
export default class ExamDetail extends Component<IProps> {
  render() {
    return (
      <div>
        <h2>试卷详情</h2>
        <Button
          onClick={() => {
            this.props.history.push('/home/examlist');
          }}
          type="primary"
        >
          返回
        </Button>
        <div className="content">
          {this.state.list.map((item: IItem) => {
            return (
              <div key={item.questions_id}>
                <p>{item.questions_stem}</p>
                <div style={{ backgroundColor: "#ccc" }}>
                  {item.questions_answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  state = {
    list: [],
  };
  async componentDidMount() {
    let result = await _show(this.props.location.state.key);
    this.setState({
      list: result.data.data.questions,
    });
  }

  componentWillUnmount(){
      this.setState=()=>false;
  }
}
