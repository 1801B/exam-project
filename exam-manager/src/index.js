/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-19 10:01:13
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-20 18:57:30
 * @FilePath: \react-mobx-ts\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import "./index.scss";
import App from "@/App.tsx";
import { Provider } from "mobx-react";
import store from "@/store";

ReactDOM.render(
    <Provider {...store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
