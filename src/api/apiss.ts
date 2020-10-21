/*
 * @Descripttion : 
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 20:08:19
 * @LastEditTime : 2020-10-21 15:32:25
 * @FilePath     : \src\api\apiss.ts
 */
import request from '../utils/request'

export function _grade(){
    const url = '/api/exam/getQuestionsType';

    return request.get(url);
}
export function _room(){
    const url = '/api/exam/subject';

    return request.get(url);
}

export function _zhou(){
    const url = '/api/exam/examType';
    return request.get(url);
}

export function _sou(){
    const url = '/api/exam/questions/new';
    return request.get(url);
}
export function _leixing(id:string){
    const url ="/exam/delQuestionsType"
    return request.post(url,{id})
}