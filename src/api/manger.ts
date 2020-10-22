import  request from "@/utils/request"
export function _grade(){
    // let url = "/manger/grade"

    return request.get("/api/manger/grade")
}
export function _class(){
    // let url = "/manger/room"
    
    return request.get("/api/manger/room")
}
export function _subject(){
    let url ="/api/exam/subject"

    return request.get(url)
}
export function _addGrade(obj:object){
    let url = "/api/manger/grade";
    // console.log(obj,url);

    request.post(url,{...obj})
}
export  function _del_grade(grade_id:string){
   
    let url = "/api/manger/grade/delete";
    console.log(grade_id,url);
    request.delete(url,{params:{grade_id:grade_id}})
}
export  function _updata(values:any){
   
    let url = "/api/manger/grade/updata";
    console.log(values.grade_name,values.room_id,values.subject_id ,url);
    request.put(url,values)

}