/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-09-14 20:00:12
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-20 18:58:30
 * @FilePath: \react-mobx-ts\src\utils\request.js
 */
import axios from 'axios';

const request = axios.create({
    timeout: 5000
})

//拦截请求
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.authorization = token;
    return config;
})

//拦截响应
request.interceptors.response.use((response) => {
    return response;
}, err => {
    return Promise.reject(err);
})

export default request;