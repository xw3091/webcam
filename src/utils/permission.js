import router from '@/router'
import { getToken, getData } from '@/utils/auth'
import store from '@/store'

// 不重定向的路由页
const whiteList = ['/start', '/goredirect']

// 遍历路由
router.beforeEach((to, from, next) => {
    // 判断是否携带token
    if (getToken()) {
        // 有token
        if (to.path === '/start') {
            next()
        } else {
            // 网页刷新,重新保存信息
            store.dispatch('setChange', { name: 'USERID', value: getData('userId')})
                .then(() => {})
            store.dispatch('setChange', { name: 'SESSIONID', value: getData('sessionId') })
                .then(() => {})
            store.dispatch('setChange', { name: 'USERTYPE', value: getData('userType') })
                .then(() => {})
            next()
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // 否则全部重定向到登录页
            next('/start')
        }
    }
})

router.afterEach(() => {
    // 路由跳转完成
})
