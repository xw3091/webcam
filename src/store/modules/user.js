import { fetchApi } from '@/api/getData'
import { setToken, setData, removeData } from '@/utils/auth'

const user = {
    state: {
        // 重要信息
        token: '',
        pubkey: '',
        aeskey: '',
        version: '',
        userId: '',
        sessionId: '',
        userType: '',
        // 次要信息
        avatar: '',
        name: '',
        password: '',
        username: '',
        status: '',
        code: ''
    },

    mutations: {
        // 主要
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_PUBKEY: (state, pubkey) => {
            state.pubkey = pubkey
        },
        SET_AESKEY: (state, aeskey) => {
            state.aeskey = aeskey
        },
        SET_VERSION: (state, version) => {
            state.version = version
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_SESSIONID: (state, sessionId) => {
            state.sessionId = sessionId
        },
        SET_USERTYPE: (state, userType) => {
            state.userType = userType
        },
        // 次要
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_PASSWORD: (state, password) => {
            state.password = password
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_CODE: (state, code) => {
            state.code = code
        }
    },

    actions: {
        // 设置状态
        setChange({ commit }, stateName) {
            return new Promise(resolve => {
                // 提交mutation来修该状态
                commit('SET_' + stateName.name, stateName.value)
                resolve()
            })
        },

        // 用户首次登录,存储token
        userLogin({ commit }, parms) {
            return new Promise((resolve, reject) => {
                fetchApi(parms).then(response => {
                    const data = response.data
                    if (data.returnCode === 0) {
                        // 设置token,暂由 sessionId代替
                        setToken(data.sessionId)
                        // 保存其他信息
                        setData('userId', data.userId)
                        setData('sessionId', data.sessionId)
                        setData('userType', data.roleId)
                        commit('SET_USERID', data.userId)
                        commit('SET_SESSIONID', data.sessionId)
                        commit('SET_USERTYPE', data.userType)
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit }, userData) {
            return new Promise((resolve, reject) => {
                const parms = {
                    'interface': 'query_user_info',
                    'userId': userData.userId,
                    'sessionId': userData.sessionId,
                    'userType': userData.userType
                }
                fetchApi(parms).then(response => {
                    const data = response.data
                    if (data.returnCode === 0) {
                        commit('SET_USERID', data.userId)
                        commit('SET_SESSIONID', data.sessionId)
                        commit('SET_USERTYPE', data.userType)
                        commit('SET_NAME', data.name)
                        commit('SET_AVATAR', data.avatar)
                        commit('SET_CODE', 0)
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出系统,清除信息
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                removeData('userId')
                removeData('sessionId')
                removeData('userType')
                commit('SET_TOKEN', '')
                commit('SET_USERID', '')
                commit('SET_SESSIONID', '')
                commit('SET_USERTYPE', '')
                commit('SET_USERNAME', '')
                commit('SET_PASSWORD', '')
                resolve()
            })
        }
    }
}

export default user