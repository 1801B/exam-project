import React, { Component, ComponentType } from "react";
import { Layout, Menu } from "antd";
import RouterView from "@/router/RouterView";
import { Link } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";
import { userViewList } from "@/api/user";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
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
  headText: string;
  viewList: Array<any>;
}

@inject((store) => store)
@observer
export default class Testques extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      headText: "添加试题",
      viewList: [],
    };
  }

  async componentDidMount() {
    let res = await userViewList((this.props as any).user.userInfo.user_id ? (this.props as any).user.userInfo.user_id : JSON.parse(sessionStorage.getItem("userInfo") as string).user_id);
    this.setState({
      viewList: res.data.data,
    });
  }

  render() {
    return (
      <div className="home">
        <header className="header">
          <img src="http://www.utc.edu/center-women-gender-equity/images/spectrumlogoupdated.jpg" alt="" />
          <dl>
            <dt></dt>
            <dd>{(this.props as any).user.userInfo.user_name ? (this.props as any).user.userInfo.user_name : JSON.parse(sessionStorage.getItem("userInfo") as string).user_name}</dd>
          </dl>
        </header>
        <Layout>
          <Sider
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" onClick={({ item }) => this.changHeadText({ item })}>
              <SubMenu
                key="sub1"
                icon={<AppstoreOutlined />}
                title="试卷管理"
                style={{
                  display:
                    this.state.viewList.findIndex((item) => item.view_authority_text === "查看试题") || this.state.viewList.findIndex((item) => item.view_authority_text === "添加试题") !== -1 || this.state.viewList.findIndex((item) => item.view_authority_text === "试题分类") !== -1
                      ? "block"
                      : "none",
                }}
              >
                <Menu.Item key="1" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "添加试题") !== -1 ? "block" : "none" }}>
                  <Link to="/home/testadd">添加试题</Link>
                </Menu.Item>
                <Menu.Item key="2" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "试题分类") !== -1 ? "block" : "none" }}>
                  <Link to="/home/testlist">试题分类</Link>
                </Menu.Item>
                <Menu.Item key="3" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "查看试题") !== -1 ? "block" : "none" }}>
                  <Link to="/home/testlook">查看试题</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="用户管理" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "添加用户") !== -1 || this.state.viewList.findIndex((item) => item.view_authority_text === "用户展示") !== -1 ? "block" : "none" }}>
                <Menu.Item key="4" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "添加用户") !== -1 ? "block" : "none" }}>
                  <Link to="/home/useradd">添加用户</Link>
                </Menu.Item>
                <Menu.Item key="5" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "用户展示") !== -1 ? "block" : "none" }}>
                  <Link to="/home/usershow">用户展示</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<AppstoreOutlined />} title="考试管理" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "试卷列表") !== -1 || this.state.viewList.findIndex((item) => item.view_authority_text === "添加考试") !== -1 ? "block" : "none" }}>
                <Menu.Item key="6" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "添加考试") !== -1 ? "block" : "none" }}>
                  <Link to="/home/examadd">添加考试</Link>
                </Menu.Item>
                <Menu.Item key="7" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "试卷列表") !== -1 ? "block" : "none" }}>
                  <Link to="/home/examlist">试卷列表</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<AppstoreOutlined />}
                title="班级管理"
                style={{
                  display:
                    this.state.viewList.findIndex((item) => item.view_authority_text === "学生管理") !== -1 || this.state.viewList.findIndex((item) => item.view_authority_text === "教室管理") !== -1 || this.state.viewList.findIndex((item) => item.view_authority_text === "班级管理") !== -1
                      ? "block"
                      : "none",
                }}
              >
                <Menu.Item key="8" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "班级管理") !== -1 ? "block" : "none" }}>
                  <Link to="/home/class">班级管理</Link>
                </Menu.Item>
                <Menu.Item key="9" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "教室管理") !== -1 ? "block" : "none" }}>
                  <Link to="/home/classroom">教室管理</Link>
                </Menu.Item>
                <Menu.Item key="10" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "学生管理") !== -1 ? "block" : "none" }}>
                  <Link to="/home/student">学生管理</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" icon={<AppstoreOutlined />} title="阅卷管理" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "待批班级") !== -1 ? "block" : "none" }}>
                <Menu.Item key="11" style={{ display: this.state.viewList.findIndex((item) => item.view_authority_text === "待批班级") !== -1 ? "block" : "none" }}>
                  <Link to="/home/waitclass">待批班级</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
              {this.state.headText}
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <RouterView routes={this.props.routes} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
  changHeadText({ item }: any) {
    this.setState({
      headText: item.props.children[1].props.children,
    });
  }
}
