/*
 * @Description:
 * @Author: 刘涵
 * @Date: 2020-10-19 10:37:01
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-22 18:37:00
 * @FilePath: \counterplan\src\router\config.ts
 */
import { lazy } from "react";
import Home from "@/view/Home";
import Login from "@/view/Login";

// 引入2级路由
const Testadd = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Testadd"));
});
const Testlist = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Testlist"));
});
const Testlook = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Testlook"));
});

const Useradd = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Useradd"));
});
const Usershow = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Usershow"));
});

const Examadd = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Examadd"));
});
const Examlist = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Examlist"));
});
//新建试卷
const ExamNew = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/ExamNew"));
});
// 试卷详情
const ExamDetail = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/ExamDetail"));
});

const Class = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Class"));
});
const Classroom = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Classroom"));
});
const Student = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Student"));
});

const Waitclass = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Waitclass"));
});
const Waitclassmate = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Waitclassmate"));
});
const StudentExamDetail = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/StudentExamDetail"));
});

const Echarts = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/Echarts"));
});

// 引入3级路由
const Apioth = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Apioth"));
});
const Iddata = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Iddata"));
});
const Idnapi = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Idnapi"));
});
const Idnoth = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Idnoth"));
});
const Userdata = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Userdata"));
});
const Viewoth = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Viewoth"));
});
const xaingssq = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/xaingssq"));
});
const Teslookbian = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 200)).then(() => import("@/view/home/usershow/Teslookbian"));
});

const router = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home/usershow/xaingssq",
        name: "xaingssq",
        component: xaingssq,
      },
      {
        path: "/home/usershow/Teslookbian",
        name: "Teslookbian",
        component: Teslookbian,
      },
      {
        path: "/home/testadd",
        name: "Testques",
        component: Testadd,
      },
      {
        path: "/home/testlist",
        name: "Testlist",
        component: Testlist,
      },
      {
        path: "/home/testlook",
        name: "Testlook",
        component: Testlook,
      },
      {
        path: "/home/useradd",
        name: "Useradd",
        component: Useradd,
      },
      {
        path: "/home/usershow",
        name: "Usershow",
        component: Usershow,
        children: [
          {
            path: "/home/usershow/userdata",
            name: "Userdata",
            component: Userdata,
          },
          {
            path: "/home/usershow/iddata",
            name: "Iddata",
            component: Iddata,
          },
          {
            path: "/home/usershow/apioth",
            name: "Apioth",
            component: Apioth,
          },
          {
            path: "/home/usershow/idnapi",
            name: "Idnapi",
            component: Idnapi,
          },
          {
            path: "/home/usershow/viewoth",
            name: "Viewoth",
            component: Viewoth,
          },
          {
            path: "/home/usershow/idnoth",
            name: "Idnoth",
            component: Idnoth,
          },
        ],
      },
      {
        path: "/home/examadd",
        name: "Examadd",
        component: Examadd,
      },
      {
        path: "/home/examlist",
        name: "Examlist",
        component: Examlist,
      },
      {
        path: "/home/examlist",
        name: "Examlist",
        component: Examlist,
      },
      {
        path: "/home/class",
        name: "Class",
        component: Class,
      },
      {
        path: "/home/classroom",
        name: "Classroom",
        component: Classroom,
      },
      {
        path: "/home/student",
        name: "Student",
        component: Student,
      },
      {
        path: "/home/waitclass",
        name: "Waitclass",
        component: Waitclass,
      },
      {
        path: "/home/examDetail",
        name: "ExamDetail",
        component: ExamDetail,
      },
      {
        path: "/home/examNew",
        name: "ExamNew",
        component: ExamNew,
      },
      {
        path: "/home/echarts",
        name: "Echarts",
        component: Echarts,
      },
      {
        path: "/home/waitclassmate",
        name: "Waitclassmate",
        component: Waitclassmate,
      },
      {
        path: "/home/studentexamdetail/:id",
        name: "StudentExamDetail",
        component: StudentExamDetail,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

export default router;
