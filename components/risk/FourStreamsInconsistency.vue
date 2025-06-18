<template>
  <div class="four-streams-inconsistency">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>风险详情</span>
        </div>
      </template>
      <el-descriptions :title="risk.details.title" :column="1" border>
        <el-descriptions-item label="业务背景">{{ risk.details.background }}</el-descriptions-item>
        <el-descriptions-item label="合同流">{{ risk.details.flow.contract }}</el-descriptions-item>
        <el-descriptions-item label="资金流">{{ risk.details.flow.funds }}</el-descriptions-item>
        <el-descriptions-item label="发票流">{{ risk.details.flow.invoice }}</el-descriptions-item>
        <el-descriptions-item label="物流流">{{ risk.details.flow.logistics }}</el-descriptions-item>
        <el-descriptions-item label="是否可以抵扣进项税额">{{ risk.details.deduction }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>对策制定</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="风险描述">{{ risk.countermeasure.description }}</el-descriptions-item>
        <el-descriptions-item label="参考指引">{{ risk.countermeasure.guidance }}</el-descriptions-item>
        <el-descriptions-item label="对策制定">
          <ul>
            <li v-for="(action, index) in risk.countermeasure.actions" :key="index">{{ action }}</li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus';

defineProps({
  risk: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.box-card {
  width: 100%;
}
.card-header {
  font-weight: bold;
}
ul {
  padding-left: 20px;
  margin: 0;
}
li {
  margin-bottom: 8px;
}
</style> 