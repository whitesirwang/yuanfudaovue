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
          path: '/tmail',
          name: '教师邮件',
          component: () => import('../components/page/Mail.vue'),
          meta: {
            title: '教师邮件'
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
          path: '/pmail',
          name: '学生邮件',
          component: () => import('../components/page/Mail.vue'),
          meta: {
            title: '学生邮件'
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
    }
  ]
})
