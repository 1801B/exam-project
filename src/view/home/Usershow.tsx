import React, { Component, ComponentType } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import RouterView from "@/router/RouterView";

interface ICom {
  path: string;
  redirect?: string;
  component?: ComponentType;
  children?: ICom;
  isHoldup?: boolean;
}
interface Iprops {
  routes: Array<ICom>;
}
interface Istate {
  title: string;
}

export default class Usershow extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: "用户数据",
    };
  }

  componentDidMount() {
    (this.props as any).history.push("/home/usershow/userdata");
  }

  render() {
    return (
      <div className="usershow">
        <div className="router-list">
          <Button onClick={() => this.titleChange("用户数据")}>
            <Link to="/home/usershow/userdata">用户数据</Link>
          </Button>
          <Button onClick={() => this.titleChange("身份数据")}>
            <Link to="/home/usershow/iddata">身份数据</Link>
          </Button>
          <Button onClick={() => this.titleChange("api接口权限")}>
            <Link to="/home/usershow/apioth">api接口权限</Link>
          </Button>
          <Button onClick={() => this.titleChange("身份和api接口关系")}>
            <Link to="/home/usershow/idnapi">身份和api接口关系</Link>
          </Button>
          <Button onClick={() => this.titleChange("视图接口权限")}>
            <Link to="/home/usershow/viewoth">视图接口权限</Link>
          </Button>
          <Button onClick={() => this.titleChange("身份和视图权限关系")}>
            <Link to="/home/usershow/idnoth">身份和视图权限关系</Link>
          </Button>
        </div>
        <div className="title">{this.state.title}</div>
        <div className="view_3">
          <RouterView routes={this.props.routes} />
        </div>
      </div>
    );
  }
  titleChange(msg: string) {
    this.setState({
      title: msg,
    });
  }
}
