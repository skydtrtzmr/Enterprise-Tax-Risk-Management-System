<template>
  <div>
    <!-- Conditionally render the specific component for SUB-TAX-01 -->
    <div v-if="riskId === 'SUB-TAX-01'" class="detail-container">
      <SubsidyManagementDetail :project-id="riskId" />
    </div>

    <!-- Fallback to the generic response page for all other risks -->
    <el-card v-else>
      <template #header>
        <h1>风险对策制定 #{{ riskId }}</h1>
      </template>
      <p>这里是风险 <strong>#{{ riskId }}</strong> 的对策制定页面。</p>
      <p>您可以在此页面制定详细的应对策略和方案。</p>
      <el-button @click="$router.back()">返回风险列表</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SubsidyManagementDetail from '~/components/risk/SubsidyManagementDetail.vue';

const route = useRoute();
const riskId = computed(() => route.params.id as string);
</script>

<style scoped>
.detail-container {
  margin: 20px;
}
.el-card {
    margin: 20px;
}
</style> 