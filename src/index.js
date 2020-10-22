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
