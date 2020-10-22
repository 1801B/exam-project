/*
 * @Description:
 * @Author: 刘涵
 * @Date: 2020-09-14 20:00:12
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-10-21 19:12:20
 * @FilePath     : \src\utils\request.js
 */
import axios from "axios";

const request = axios.create({
  timeout: 5000,
});

//拦截请求
<<<<<<< HEAD
request.interceptors.request.use(config => {
    console.log(localStorage.getItem('token'))
    const token = localStorage.getItem('token');
    config.headers.authorization = token;
    return config;
})
=======
request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.authorization = token;
  return config;
});
>>>>>>> a14afed227e6efb7b75a9fa0f1d61dc9110f03a6

//拦截响应
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 403 || response.data.code === 401) {
      window.location.href = "/login";
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
