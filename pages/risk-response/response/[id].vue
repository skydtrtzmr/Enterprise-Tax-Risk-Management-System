<template>
  <div class="page-container">
    <!-- Header for the special SUB-TAX-01 case -->
    <el-page-header v-if="riskId === 'SUB-TAX-01'" @back="onBack">
      <template #title>
        <span class="back-title">返回列表</span>
      </template>
      <template #content>
        <span class="page-title">对策制定：新型锂电池材料研发补贴</span>
      </template>
    </el-page-header>

    <!-- Header for all other generic cases -->
    <el-page-header v-else @back="onBack">
      <template #title>
        <span class="back-title">返回列表</span>
      </template>
      <template #content>
        <span class="page-title">风险对策制定 #{{ riskId }}</span>
      </template>
    </el-page-header>
    
    <!-- Content Area -->
    <div class="content-wrapper">
      <!-- Conditionally render the specific component for SUB-TAX-01 -->
      <SubsidyManagementDetail v-if="riskId === 'SUB-TAX-01'" :project-id="riskId" />

      <!-- Fallback to the generic response page for all other risks -->
      <el-card v-else class="content-card">
        <p>这里是风险 <strong>#{{ riskId }}</strong> 的对策制定页面。</p>
        <p>您可以在此页面制定详细的应对策略和方案。</p>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SubsidyManagementDetail from '~/components/risk/SubsidyManagementDetail.vue';

const route = useRoute();
const router = useRouter();
const riskId = computed(() => route.params.id as string);

const onBack = () => {
  router.back();
};
</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.back-title {
  font-weight: 500;
}

.content-wrapper {
  margin-top: 24px;
}

.content-card {
  border-radius: 8px;
}
</style> 