/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-21 14:44:40
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-21 20:58:58
 * @FilePath: \counterplan\src\api\user.ts
 */
import request from "@/utils/request";
import { User, UpUser, IdentityEdit, AuthorityApiEdit, OnsetIdentityApi, OnsetIdentityView, AuthorityApiView, UserViewListId } from "@/interface";

interface Login {
  username: string;
  password: string;
}

// 根据用户id，返回用户视图
export function userViewList(user_id: UserViewListId) {
  const url = "/api/user/new";
  return request.get(url, { params: { user_id } });
}

export function userData() {
  const url = "/api/user/user";
  return request.get(url);
}

export function userIdentity() {
  const url = "/api/user/identity";
  return request.get(url);
}

export function apioauth() {
  const url = "/api/user/api_authority";
  return request.get(url);
}

export function idnapi() {
  const url = "/api/user/identity_api_authority_relation";
  return request.get(url);
}

export function viewoth() {
  const url = "/api/user/view_authority";
  return request.get(url);
}

export function idnoth() {
  const url = "/api/user/identity_view_authority_relation";
  return request.get(url);
}

// 登录
export function _login({ username, password }: Login) {
  const url = "/api/user/login";
  return request.post(url, { user_name: username, user_pwd: password });
}

// 展示所有的身份
export function _identity() {
  const url = "/api/user/identity";
  return request.get(url);
}

// 展示所有的用户
export function _userUser() {
  const url = "/api/user/user";
  return request.get(url);
}

// 创建用户
export function _user(query: User) {
  const url = "/api/user";
  return request.post(url, { ...query });
}

// 更新用户
export function _userUpUser(query: UpUser) {
  const url = "/api/user/user";
  return request.put(url, { ...query });
}

// 添加身份
export function _identityEdit(params: IdentityEdit) {
  const url = "/api/user/identity/edit";
  return request.get(url, { params });
}

// 添加api接口权限
export function _authorityApiEdit(params: AuthorityApiEdit) {
  const url = "/api/user/authorityApi/edit";
  return request.get(url, { params });
}

// 视图接口
export function _viewAuthority() {
  const url = "/api/user/view_authority";
  return request.get(url);
}

// 获取所有api接口
export function _apiAuthority() {
  const url = "/api/user/api_authority";
  return request.get(url);
}

// 给身份设置api接口
export function _setIdentityApi(query: OnsetIdentityApi) {
  const url = "/api/user/setIdentityApi";
  return request.post(url, { ...query });
}

// 给身份添加视图权限
export function _setIdentityView(query: OnsetIdentityView) {
  const url = "/api/user/setIdentityView";
  return request.post(url, { ...query });
}

// 添加视图接口
export function _authorityViewEdit(params: AuthorityApiView) {
  const url = "/user/authorityView/edit";
  return request.get(url, { params });
}
