/*
 * @Descripttion :
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-21 10:34:20
 * @FilePath     : \src\view\home\Testadd.tsx
 */

import React, { Component } from "react";

interface State {
  list: Array<any>;
  tg: string;
}
export default class Testques extends Component<any, State> {
  state = {
    list: [],
    tg: "",
  };
  inputChange(e: InputEvent) {
    let el = (e.target as any).value;

    this.setState({
      tg: el,
    });
  }
  getInputValue() {
    console.log(this.state.tg);
  }
  render() {
    return (
      <div className="Testadd">
        <p>题目信息</p>
        <p>题干</p>
        <p>
          {" "}
          <input value={this.state.tg} onChange={(e) => this.inputChange(e as any)}></input>{" "}
        </p>
        <p>
          <button onClick={() => this.getInputValue()}>提交</button>
        </p>
        <p>题目主题</p>
      </div>
    );
  }
}
