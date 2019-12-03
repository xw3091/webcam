import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user
    },
    getters: {
        // 重要信息
        token: state => state.user.token,
        pubkey: state => state.user.pubkey,
        aeskey: state => state.user.aeskey,
        version: state => state.user.version,
        userId: state => state.user.userId,
        sessionId: state => state.user.sessionId,
        userType: state => state.user.userType,
        // 次要信息
        avatar: state => state.user.avatar,
        name: state => state.user.name,
        username: state => state.user.username,
        password: state => state.user.password,
        status: state => state.user.status,
        device: state => state.app.device,
        code: state => state.user.code
    }
})

export default store