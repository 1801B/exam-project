/*
 * @Descripttion : 
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime : 2020-10-21 19:10:50
 * @FilePath     : \src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import "@/assets/css/index.scss";
import "@/assets/css/gzk.scss";
import App from "@/App.tsx";
import { Provider } from "mobx-react";
import store from "@/store";

import "./index.scss";
import "@/assets/css/login.scss";
import "@/assets/css/userAdd.scss";

console.log(store);
ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
