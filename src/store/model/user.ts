/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-20 18:27:39
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-20 20:32:59
 * @FilePath: \react-mobx-ts\src\store\model\user.ts
 */
import {observable,action,makeObservable, runInAction} from 'mobx';
import {userData} from '@/api/user';

class UserStore {
    constructor(){
        makeObservable(this);
    }

    @observable namespace = 'user';
    @observable userData = [];

    @action
    getUserData = async () => {
           const result = await userData ();
           console.log(result)
            runInAction(() => {
               this.userData = result.data.data;
            })
        
    }

   
}
export default new UserStore();