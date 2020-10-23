import { observable, action, makeObservable, runInAction } from "mobx";
import { userData } from "@/api/user";

class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable namespace = "user";
  @observable token = "";
  @observable userInfo = {};
  @observable userData = [];

  @action userMsg = ({ token, userInfo }) => {
    this.token = token;
    this.userInfo = userInfo;
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("token", token);
  };

  @action getUserData = async () => {
    const result = await userData();
    runInAction(() => {
      this.userData = result.data.data;
    });
  };

  @action cleanAuth = () => {
    this.token = "";
    this.userInfo = "";
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
  };
}

export default new UserStore();
