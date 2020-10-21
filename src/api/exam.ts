import request from '@/utils/request';

//获取考试类型接口
export function _allExamType()
{
    const url='/api/exam/examType';
    return request.get(url);
}
//获取课程接口
export function _allCourseType()
{
    const url='/api/exam/subject';
    return request.get(url);
}

//获取试卷列表接口
export function _allCourseList()
{
    const url='/api/exam/exam';
    return request.get(url)
}

//获取题目类型接口
export function _getQuestionType()
{
    const url='/api/exam/getQuestionsType';
    return request.get(url)
}

//添加试卷接口
export function _addTest(params:any){
    let url='/api/exam/exam'
    return request.post(url,params)
}

//获取所有试题列表接口(机器人补位。。。)
export function _getTestList(){
    let url='/api/exam/questions/new'
    return request.get(url)
}

//试卷列表跳转详情接口
export function _show(exam_id:any)
{
    let url=`/api/exam/exam/${exam_id}`
    return request.get(url)
}

// 搜索接口
export function _search(subject_id: any,exam_id: undefined,questions_type_id: undefined)
{
    let url=`/api/exam/questions/condition/?subject_id=${subject_id}&exam_id=${exam_id}&questions_type_id=${questions_type_id}`;
    return request.get(url)
}
