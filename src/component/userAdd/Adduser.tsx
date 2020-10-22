import React from "react";
import { Tabs } from "antd";
import Add from "./children/Add";
import Up from "./children/Up";

const { TabPane } = Tabs;

function Adduser() {
  return (
    <Tabs type="card" className="tabs">
      <TabPane tab="添加用户" key="1">
        <Add />
      </TabPane>
      <TabPane tab="更新用户" key="2">
        <Up />
      </TabPane>
    </Tabs>
  );
}
export default Adduser;
