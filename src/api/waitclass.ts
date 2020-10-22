import request from '../utils/request'

export function _getGrade(){
    return request.get('/api/manger/grade')
}

export function _getExamList(grade_id:string){
    return request.get('/api/exam/student',{params:{grade_id}})
}

export function _getStudentExamDetail(exam_student_id:string|number){
    return request.get(`/api/exam/student/${exam_student_id}`)
}

export function _editStudentExam(id:string,score:string|number){
    return request.put(`/api/exam/student/${id}`,{id,score})
}