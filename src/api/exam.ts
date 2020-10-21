import request from '@/utils/request'

export function _examType(){
    const url="/api/exam/examType";

    return request.get(url);
}