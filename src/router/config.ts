/*
 * @Description:
 * @Author: 刘涵
 * @Date: 2020-10-19 10:37:01
 * @LastEditors: 刘涵
 * @LastEditTime: 2020-10-22 10:58:03
 * @FilePath: \counterplan\src\router\config.ts
 */
import Home from "@/view/Home";
import Detail from "@/view/Detail";
import Login from "@/view/Login";

// 引入2级路由
import Testadd from "@/view/home/Testadd";
import Testlist from "@/view/home/Testlist";
import Testlook from "@/view/home/Testlook";

import Useradd from "@/view/home/Useradd";
import Usershow from "@/view/home/Usershow";


import Examadd from '@/view/home/Examadd'
import Examlist from '@/view/home/Examlist'
//新建试卷
import ExamNew from '@/view/home/ExamNew'
// 试卷详情
import ExamDetail from '@/view/home/ExamDetail'

import Class from "@/view/home/Class";
import Classroom from "@/view/home/Classroom";
import Student from "@/view/home/Student";

import Waitclass from "@/view/home/Waitclass";

import Echarts from "@/view/home/Echarts"

// 引入3级路由
import Apioth from "@/view/home/usershow/Apioth";
import Iddata from "@/view/home/usershow/Iddata";
import Idnapi from "@/view/home/usershow/Idnapi";
import Idnoth from "@/view/home/usershow/Idnoth";
import Userdata from "@/view/home/usershow/Userdata";
import Viewoth from "@/view/home/usershow/Viewoth";

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
        path: '/home/examDetail',
        name: 'ExamDetail',
        component: ExamDetail
    },
    {
      path: '/home/examNew',
      name: 'ExamNew',
      component: ExamNew
    },
    {
      path: '/home/echarts',
      name: 'Echarts',
      component: Echarts
    },
    ],
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

export default router;
