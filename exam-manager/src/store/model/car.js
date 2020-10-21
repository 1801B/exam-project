/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-12 15:29:51
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-12 19:35:18
 * @FilePath: \my-react-mobx\src\store\model\car.js
 */
import { observable, action, makeObservable } from 'mobx';

class CarStore {
    constructor(){
        makeObservable(this);
    }

    @observable namespace = 'car';
    @observable name = 'liuhan';
    @observable shop = [
        {
            id: 0,
            title: '苹果',
            num: 1,
            price: 3
        },
        {
            id: 1,
            title: '柚子',
            num: 1,
            price: 5
        },
        {
            id: 2,
            title: '葡萄',
            num: 1,
            price: 2
        }
    ]

    @action
    changeName () {
        this.name = 'zhangsanfeng';
    }

    @action
    updateShop = (sym,id) => {
        console.log(this);
        let temp = JSON.parse(JSON.stringify(this.shop));
        let target = temp.filter(item => item.id === id)[0];
        if (sym === 'add') {
            target.num ++;
        } else {
            target.num --;
            target.num = target.num <= 0 ? 1 : target.num;
        };
        this.shop = temp;
    }
}
export default new CarStore();