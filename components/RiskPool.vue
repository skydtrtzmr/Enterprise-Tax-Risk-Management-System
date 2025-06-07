<template>
  <el-card class="box-card">
    <div class="card-content">
      <el-icon :size="48" color="#909399"><TakeawayBox /></el-icon>
      <h2>风险池</h2>
      <p>此功能正在开发中，敬请期待！</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { TakeawayBox } from '@element-plus/icons-vue'
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  color: #606266;
}

h2 {
  margin: 20px 0 10px;
  font-size: 24px;
}

p {
  font-size: 14px;
  color: #909399;
}
</style> 