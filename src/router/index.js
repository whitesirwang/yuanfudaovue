import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/teacher',
      component: () => import('../components/common/TeacherBase.vue'),
      meta: {
        title: '老师公共部分'
      },
      children: [
        {
          path: '/ttorfproblemstatus/:sid/:hid',
          component: () => import('../components/page/teacher/YesOrNoProblemStatus.vue'),
          meta: {
            title: '单选题'
          }
        },
        {
          path: '/tsigproblemstatus/:sid/:hid',
          component: () => import('../components/page/teacher/SingleProblemStatus.vue'),
          meta: {
            title: '单选题'
          }
        },
        {
          path: '/tmultiproblemstatus/:sid/:hid',
          component: () => import('../components/page/teacher/MultiProblemStatus.vue'),
          meta: {
            title: '多选题'
          }
        },
        {
          path: '/tstudenthomeworkstatus/:sid/:hid',
          name: '作业成绩',
          component: () => import('../components/page/Teacher/StudentHomeworkStatus.vue'),
          meta: {
            title: '作业成绩'
          }
        },
        {
          path: '/thomeworkstudents/:cid/:id',
          name: '学生作业情况',
          component: () => import('../components/page/Teacher/HomeWorkStudents.vue'),
          meta: {
            title: '学生作业情况'
          }
        },
        {
          path: '/tcoursestudents/:id',
          name: '选课学生',
          component: () => import('../components/page/Teacher/CourseStudents.vue'),
          meta: {
            title: '选课学生'
          }
        },
        {
          path: '/tedithomework/:id',
          name: '编辑课后作业',
          component: () => import('../components/page/Teacher/EditHomework.vue'),
          meta: {
            title: '编辑课后作业'
          }
        },
        {
          path: '/tedittorf/:id',
          name: '编辑是非题',
          component: () => import('../components/page/Teacher/EditYesOrNoProblems.vue'),
          meta: {
            title: '编辑是非题'
          }
        },
        {
          path: '/teditmulti/:id',
          name: '编辑多选题',
          component: () => import('../components/page/Teacher/EditMultiProblems.vue'),
          meta: {
            title: '编辑多选题'
          }
        },
        {
          path: '/teditsig/:id',
          name: '编辑单选题',
          component: () => import('../components/page/Teacher/EditSigProblems.vue'),
          meta: {
            title: '编辑单选题'
          }
        },
        {
          path: '/tmail',
          name: '邮件',
          component: () => import('../components/page/Teacher/SMail.vue'),
          meta: {
            title: '邮件'
          }
        },
        {
          path: "/tmaildetail/:id",
          name: "邮件详情",
          component: () => import('../components/page/Teacher/SeeMail.vue'),
          meta: {
            title: '邮件详情'
          }
        },
        {
          path: '/tmain',
          name: '教师信息',
          component: () => import('../components/page/teacher/UserInfo.vue'),
          meta: {
            title: '教师个人信息'
          }
        },
        {
          path: '/addcourse',
          name: '开课',
          component: () => import('../components/page/teacher/addCourse.vue'),
          meta: {
            title: '开课'
          }
        },
        {
          path: '/teacherCourses',
          name: '我开的课',
          component: () => import('../components/page/teacher/teacherCourses.vue'),
          meta: {
            title: '我开的课'
          }
        },
        {
          path: '/editcoursedetail/:id',
          name: '编辑课时',
          component: () => import('../components/page/teacher/EditCourseDetail.vue'),
          meta: {
            title: '编辑课时'
          }
        },
        {
          path: '/addcoursedetail/:id',
          name: '添加课时',
          component: () => import('../components/page/teacher/addCourseDetail.vue'),
          meta: {
            title: '添加课时'
          }
        },
        {
          path: '/editcourse/:id',
          name: '编辑课程',
          component: () => import('../components/page/teacher/EditCourse.vue'),
          meta: {
            title: '编辑课程'
          }
        },
        {
          path: '/tstudentinfo/:id',
          name: '学生信息',
          component: () => import('../components/page/teacher/StudentInfo.vue'),
          meta: {
            title: '学生信息'
          }
        },
        {
          path: '/ttongji/:id',
          name: '统计',
          component: () => import('../components/page/teacher/SigTongji.vue'),
          meta: {
            title: '统计'
          }
        },
      ]
    },
    {
      path: '/student',
      component: () => import('../components/common/StudentBase.vue'),
      meta: {
        title: '学生公共部分'
      },
      children: [
        {
          path: '/smain',
          name: '学生信息修改',
          component: () => import('../components/page/student/UserInfo.vue'),
          meta: {
            title: '学生个人信息'
          }
        },
        {
          path: '/storfproblemstatus/:id',
          component: () => import('../components/page/Student/YesOrNoProblemStatus.vue'),
          meta: {
            title: '判断题'
          }
        },
        {
          path: '/ssingleproblemstatus/:id',
          component: () => import('../components/page/Student/SingleProblemStatus.vue'),
          meta: {
            title: '单选题'
          }
        },
        {
          path: '/smultiproblemstatus/:id',
          component: () => import('../components/page/Student/MultiProblemStatus.vue'),
          meta: {
            title: '多选题'
          }
        },
        {
          path: '/ssingleproblem/:id',
          component: () => import('../components/page/Student/SingleProblem.vue'),
          meta: {
            title: '单选题'
          }
        },
        {
          path: '/storfproblem/:id',
          component: () => import('../components/page/Student/YesOrNoProblem.vue'),
          meta: {
            title: '是非题'
          }
        },
        {
          path: '/smultiproblem/:id',
          component: () => import('../components/page/Student/MultiProblem.vue'),
          meta: {
            title: '多选题'
          }
        },
        {
          path: '/shomeworktype/:id',
          component: () => import('../components/page/Student/HomeworkType.vue'),
          meta: {
            title: '作业大纲'
          }
        },
        {
          path: '/teachers',
          component: () => import('../components/page/Student/Teachers.vue'),
          meta: {
            title: '教师'
          }
        },
        {
          path: '/teacherDetailInfo/:username',
          component: () => import('../components/page/Student/TeacherInfo.vue'),
          meta: {
            title: '教师详细信息'
          }
        },
        {
          path: '/smail',
          name: '邮件',
          component: () => import('../components/page/Student/SMail.vue'),
          meta: {
            title: '邮件'
          }
        },
        {
          path: "/smaildetail/:id",
          name: "邮件详情",
          component: () => import('../components/page/Student/SeeMail.vue'),
          meta: {
            title: '邮件详情'
          }
        },
        {
          path: '/courses',
          name: '课程总览',
          component: () => import('../components/page/course/courses.vue'),
          meta: {
            title: '课程总览'
          }
        },
        {
          path: "/scourse/:id",
          name: '学生课程信息',
          component: () => import('../components/page/Student/Course'),
          meta: {
            title: '课程信息'
          }
        },
        {
          path: "/scourseDetail/:id",
          name: '课时详情',
          component: () => import('../components/page/Student/CourseDetail'),
          meta: {
            title: '课时信息'
          }
        },
        {
          path: "/scourses",
          name: '我选的课',
          component: () => import('../components/page/Student/StudentCourses.vue'),
          meta: {
            title: '我选的课'
          }
        },
        {
          path: "/shotteacher",
          name: '教师排行榜',
          component: () => import('../components/page/Student/HotTeacher.vue'),
          meta: {
            title: '教师排行榜'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue')
    },
    {
      path: '/error',
      component: () => import('../components/page/err/Error.vue')
    },
    {
      path: '/404',
      component: () => import('../components/page/err/404.vue')
    },
    {
      path: '/test',
      component: () => import('../components/page/test.vue')
    },
    {
      path: '/studentRegist',
      component: () => import('../components/page/Student/Regist.vue'),
    }
  ]
})
