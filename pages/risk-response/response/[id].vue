<template>
  <el-card>
    <template #header>
      <h1>风险对策制定 #{{ $route.params.id }}</h1>
    </template>
    <p>这里是风险 <strong>#{{ $route.params.id }}</strong> 的对策制定页面。</p>
    <p>您可以在此页面制定详细的应对策略和方案。</p>
    <el-button @click="$router.back()">返回风险列表</el-button>
  </el-card>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.el-card {
    margin: 20px;
}
</style> 