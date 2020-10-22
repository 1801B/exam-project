import React, { Component, ComponentType } from "react";
import { Layout, Menu } from "antd";
import RouterView from "@/router/RouterView";
import { Link } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import { observer, inject } from "mobx-react";

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
}

@inject((store) => store)
@observer
export default class Testques extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      headText: "添加试题",
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="home">
        <header className="header">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
            alt=""
          />
          <dl>
            <dd></dd>
            <dt>刘涵</dt>
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
              <SubMenu key="sub1" icon={<AppstoreOutlined />} title="试卷管理">
                <Menu.Item key="1">
                  <Link to="/home/testadd">添加试题</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/home/testlist">试题分类</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/home/testlook">查看试题</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="用户管理">
                <Menu.Item key="4">
                  <Link to="/home/useradd">添加用户</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/home/usershow">用户展示</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<AppstoreOutlined />} title="考试管理">
                <Menu.Item key="6">
                  <Link to="/home/examadd">添加考试</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/home/examlist">考试列表</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<AppstoreOutlined />} title="班级管理">
                <Menu.Item key="8">
                  <Link to="/home/class">班级管理</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to="/home/classroom">教室管理</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/home/student">学生管理</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" icon={<AppstoreOutlined />} title="阅卷管理">
                <Menu.Item key="11">
                  <Link to="/home/waitclass">待批班级</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0 }}
            >
              {this.state.headText}
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
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
