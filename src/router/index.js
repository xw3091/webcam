import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
    routes: [
        // 基本router
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login')
        },
        {
            path: '/404',
            component: () => import('@/views/error-page/404'),
            hidden: true
        },
        {
            path: '/goredirect',
            component: () => import('@/views/home'),
            hidden: true
        },
        {
            path: '',
            component: Layout,
            redirect: '/start',
            children: [
                {
                    path: '/start',
                    name: 'start',
                    component: () => import('@/views/home/start')
                }
            ]
        },
        // 内容router
        {
            path: '/',
            name: 'home',
            component: Layout,
            redirect: 'noredirect',
            children: [
                {
                    path: '/basic_info',
                    name: 'basic_info',
                    component: () => import('@/views/home/basic_info')
                },
                {
                    path: '/certification_info',
                    name: 'certification_info',
                    component: () => import('@/views/home/certification_info')
                }
            ]
        }
    ]
})