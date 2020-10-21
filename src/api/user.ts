/*
 * @Description: 
 * @Author: 刘涵
 * @Date: 2020-10-20 13:15:16
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-20 20:34:43
 * @FilePath: \react-mobx-ts\src\api\user.ts
 */
import request from '@/utils/request'

export function examType(){
    const url='/api/exam/examType';
    return request.get(url);
}

export function userData(){
    const url='/api/user/user';
    return request.get(url);
}

export function userIdentity(){
    const url='/api/user/identity';
    return request.get(url);
}