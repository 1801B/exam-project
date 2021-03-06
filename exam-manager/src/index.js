/*
 * @Descripttion : 
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 10:37:13
 * @LastEditTime: 2020-10-22 19:07:36
 * @FilePath: \counterplan\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
import "@/assets/css/gzk.scss";
import App from "@/App.tsx";
import { Provider } from "mobx-react";
import store from "@/store";

import "@/assets/css/login.scss";
import "@/assets/css/userAdd.scss";
import "@/assets/css/index.scss";

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
