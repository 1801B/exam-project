import React from "react";

// 添加用户
import Adduser from "@/components/userAdd/Adduser";
// 添加身份
import Identity from "@/components/userAdd/Identity";
// 添加api
import AuthorityApi from "@/components/userAdd/AuthorityApi";
// 添加视图接口
import AuthorityView from "@/components/userAdd/AuthorityView";
// 给身份设置api接口
import SetIdentityApi from "@/components/userAdd/SetIdentityApi";
// 给身份设置视图权限
import SetIdentityView from "@/components/userAdd/SetIdentityView";

function Useradd() {
  return (
    <div className="userAdd">
      <Adduser />
      <Identity />
      <AuthorityApi />
      <AuthorityView />
      <SetIdentityApi />
      <SetIdentityView />
    </div>
  );
}

export default Useradd;
