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
        }
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
          component: () => import('../components/page/Teachers.vue'),
          meta: {
            title: '教师'
          }
        },
        {
          path: '/teacherDetailInfo',
          component: () => import('../components/page/teacher/TeacherInfo.vue'),
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
    }
  ]
})
