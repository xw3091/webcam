<template>
    <div>
        <div>快盆-商家端-注册3-资质信息</div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click.native="onChange(item.label)">
            </el-option>
        </el-select>
        <div>选中id： {{value}}</div>
        <div>选中text： {{text}}</div>
        <el-button type="primary" @click="next">提交</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            options: [{
                value: '1',
                label: '黄金糕'
            }, {
                value: '2',
                label: '双皮奶'
            }, {
                value: '3',
                label: '蚵仔煎'
            }],
            value: ''
        }
    },
    mounted() {
    },
    methods: {
        next() {
            this.$message({
                message: '提交成功',
                type: 'success'
            })
        },
        onChange(val) {
            this.text = val
        }
    }
 }
</script>