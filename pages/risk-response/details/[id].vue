<template>
  <el-card>
    <template #header>
      <h1>风险详情 #{{ $route.params.id }}</h1>
    </template>
    <p>这里是风险的详细信息。</p>
    <p>后续可以根据风险类型，在这里展示不同的详情组件，比如之前为补贴设计的 `SubsidyManagementDetail.vue`。</p>
    <el-button @click="$router.back()">返回列表</el-button>
  </el-card>
</template>

<script setup lang="ts">
// Using definePageMeta for Nuxt 3 to set layout or other page options if needed
// definePageMeta({
//   layout: 'default',
// });
</script>

<style scoped>
.el-card {
    margin: 20px;
}
</style> 