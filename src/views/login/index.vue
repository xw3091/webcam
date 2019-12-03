<template>
    <div class="app-background">
        <div class="app-container">
            <div class="wrapper">
                <h1 class="logo"></h1>
                <h2 class="slogan">
                    快盆商户版
                </h2>
                <div class="wrapper-content">
                    <el-input
                    placeholder="请输入手机号"
                    v-model="phoneNumber"
                    maxlength="11">
                    </el-input>
                    <el-button type="text" class="btn-text" :disabled="disabledCode" @click="getCode">{{btnText}}</el-button>
                </div>
                <el-input
                    placeholder="验证码"
                    v-model="verificationCode"
                    maxlength="4">
                </el-input>
                <el-button type="primary" @click="login" :disabled="disabledLogin" :loading="loading">注册/登陆</el-button>
                <div class="signUp-hyperlink">未注册手机号将自动为您注册</div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchApi } from '@/api/getData'
import {validatePhoneNumber} from '@/utils/validate'

export default {
    name: 'login',
    data() {
        return {
            disabledCode: true,
            disabledLogin: true,
            btnText: '获取验证码',
            phoneNumber: '',
            verificationCode: '',
            loading: false,
            // 获取验证码
            get_verification_code: {
                interface: 'get_verification_code',
                phoneNumber: '',
                userType: 2,
                // senderId: 1
            },
            // 登陆
            user_login: {
                interface: 'user_login',
                phoneNumber: '',
                verificationCode: '',
                userType: 2
            }
        }
    },
    watch: {
        phoneNumber: function(val) {
            if (validatePhoneNumber(val)) {
                this.disabledCode = false
                this.get_verification_code.phoneNumber = val
                let reg = /^\d{4}$/
                if (reg.test(this.verificationCode)) {
                    this.disabledLogin = false
                } else {
                    this.disabledLogin = true
                }
            } else {
                this.disabledCode = true
                this.disabledLogin = true
            }
        },
        verificationCode: function(val) {
            let reg = /^\d{4}$/
            if (validatePhoneNumber(this.phoneNumber) && reg.test(val)) {
                this.disabledLogin = false
            } else {
                this.disabledLogin = true
            }
        }
    },
    created() {
        // 判断是否为移动端设备
        const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
        if (isMobile) {
            document.querySelector('body').className = 'isMobile'
        } else {
            document.querySelector('body').className = 'isPc'
        }
    },
    methods: {
        // 获取验证码
        getCode() {
            this.get_verification_code.phoneNumber = this.phoneNumber
            fetchApi(this.get_verification_code).then((response) => {
                const res = response.data
                //首次请求无密钥,重新发起请求,获取密钥
                if (res.returnCode === 555) {
                    this.getCode()
                } else {
                    this.verificationCode = res.verificationCode
                    this.disabledCode = true
                    let codeTime = 60
                    this.btnText = codeTime + 's'
                    const codeTimetimer = setInterval(() => {
                        codeTime--
                        this.btnText = codeTime + 's'
                        if (codeTime <= 0) {
                            clearInterval(codeTimetimer)
                            this.btnText = '获取验证码'
                            if (validatePhoneNumber(this.phoneNumber)) {
                                this.disabledCode = false
                            }
                        }
                    }, 1000)
                }
            }).catch((err) => {
                console.error(err)
            })
        },
        // 登陆
        login() {
            this.loading = true
            this.user_login.phoneNumber = this.phoneNumber
            this.user_login.verificationCode = this.verificationCode
            this.$store.dispatch('userLogin', this.user_login).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch((err) => {
              this.loading = false
              console.error(err)
            })
        }
    }
}
</script>