import { observable, action, makeObservable, runInAction } from "mobx";
import { userData } from "@/api/user";

class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable namespace = "user";
  @observable token = "";
  @observable userData = [];

  @action getToken = (token) => {
    this.token = token;
    localStorage.setItem("token", token);
  };

  @action getUserData = async () => {
    const result = await userData();
    console.log(result);
    runInAction(() => {
      this.userData = result.data.data;
    });
  };
}

export default new UserStore();
