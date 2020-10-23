import request from "@/utils/request";
export function _grade() {
  return request.get("/api/manger/grade");
}
export function _class() {
  return request.get("/api/manger/room");
}
export function _subject() {
  let url = "/api/exam/subject";
  return request.get(url);
}
export function _addGrade(obj: object) {
  let url = "/api/manger/grade";
  request.post(url, { ...obj });
}
export function _del_grade(grade_id: string) {
  let url = "/api/manger/grade/delete";
  request.delete(url, { params: { grade_id: grade_id } });
}
export function _updata(grade_id: string, room_id: string, subject_id: string) {
  let url = "/api/manger/grade/updata";
  return request.put(url, { grade_id, room_id, subject_id });
}
export function _de_room(id: any) {
  let url = "/api/mange/room/delete";
  let room_id = id;
  request.delete(url, { params: { room_id } });
}

export function _addRoom(room_text: string) {
  let url = "/api/manger/room";
  request.post(url, { room_text });
}
export function _student() {
  let url = "/api/manger/student";
  return request.get(url);
}
export function _del_student(student_id: string) {
  let url = `/api/manger/student/${student_id}`;
  return request.delete(url);
}
