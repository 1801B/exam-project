/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-12 11:25:41
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-20 18:47:41
 * @FilePath: \react-mobx-ts\src\store\index.js
 */
const context = require.context('./model', false, /\.js|\.ts$/);

const getModel = context.keys().map(key => context(key));

const Store = {};

getModel.forEach(model => {
    Store[model.default.namespace] = model.default;
});

export default Store;
