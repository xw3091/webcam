<template>
    <div>
        <div>快盆-商家端-注册1-门店信息</div>
        <el-button type="primary" @click="next">下一步</el-button>
    </div>
</template>

<script>
import { setToken } from '@/utils/auth'

export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        next() {
            setToken('abc')
            this.$router.push({ path: 'basic_info' })
        }
    }
 }
</script>