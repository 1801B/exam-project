/*
 * @Descripttion : 
 * @Autor        : 高泽康
 * @Date         : 2020-10-20 20:08:19
 * @LastEditTime : 2020-10-22 15:06:06
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
    const url ="/api/exam/delQuestionsType"
    return request.post(url,{id})
}

export function _cha(questions_type_id:string,exam_id:string,subject_id:string){
    const url ="/api/exam/questions/condition"
    return request.get(url,{params:{questions_type_id,exam_id,subject_id}})
    
}
export function _chaid(questions_id:string){
    const url ="/api/exam/questions/condition"
    return request.get(url,{params:{questions_id}})
    
}

export function _tianjia(exam_id:string,questions_answer:string
    ,questions_stem:string,questions_type_id:string,subject_id:string,
    title:string){
    const url ="/api/exam/questions/update";
    const user_id=JSON.parse(sessionStorage.getItem('userInfo') as string).user_id;
    return request.put(url,{exam_id,questions_answer,
        questions_stem,questions_type_id,subject_id,title,user_id})
    
}
