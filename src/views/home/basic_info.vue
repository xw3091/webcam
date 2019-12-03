<template>
    <div>
        <div>快盆-商家端-注册2-资质信息</div>
        <Webcam v-if="isShow" @on-change="onChange"></Webcam>
        <img class="img" :src="src" alt="img">
        <el-button v-if="isReCam" type="primary" @click="reCam">重拍</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
    </div>
</template>

<script>
import Webcam from '@/components/webcam'
export default {
    components: {
        Webcam
    },
    data() {
        return {
            src: '',
            isShow: true,
            isReCam: false
        }
    },
    mounted() {
    },
    methods: {
        next() {
            this.$router.push({ path: 'certification_info' })
        },
        onChange(val) {
            this.src = val
            this.isShow = false
            this.isReCam = true
        },
        reCam() {
            this.isShow = true
            this.isReCam = false
        }
    }
 }
</script>

<style>
.img {
    width: 600px;
    height: 400px;
}
</style>