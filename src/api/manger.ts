import  request from "@/utils/request"
import { IdcardFilled } from "@ant-design/icons"
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
export  function _updata(grade_id:string,room_id:string,subject_id:string){
   
    let url = "/api/manger/grade/updata";
    return request.put(url,{grade_id,room_id,subject_id})

}
export function _de_room(id:any){
    let url = "/api/mange/room/delete"
    let room_id= id
   request.delete(url,{params:{room_id}})
}

export function _addRoom(room_text:string){
    console.log(room_text)
    let url ="/api/manger/room"
    request.post(url,{room_text})
}
export function _student(){
    let url ="/api/manger/student"

    return request.get(url)
}
export function  _del_student(student_id:string){
    let url =`/api/manger/student/${student_id}`
    console.log(student_id,url)
    return request.delete(url)
}