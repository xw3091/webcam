<template>
    <el-container class="app-wrapper">
      <el-container class="app-content">
        <div class="app-main">
          <router-view :key="key"></router-view>
        </div>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    key() {
      console.log(this.$route.fullPath)
      return this.$route.fullPath
    }
  }
}
</script>