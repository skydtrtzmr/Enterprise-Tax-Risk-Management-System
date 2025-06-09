<template>
  <el-card class="details-card" v-loading="pending">
    <template #header>
      <div class="card-header">
        <span>风险详情</span>
        <el-button @click="$router.back()">返回列表</el-button>
      </div>
    </template>

    <div v-if="error" class="error-state">
      <el-alert
        :title="`加载风险详情失败 (ID: ${riskId})`"
        type="error"
        :description="error.statusMessage || error.message"
        show-icon
        :closable="false"
      />
    </div>

    <div v-else class="markdown-body" v-html="renderedMarkdown"></div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';

const route = useRoute();
const riskId = computed(() => route.params.id as string);

const { data: renderedMarkdown, pending, error } = useFetch(
  () => `/risks/${riskId.value}`, // The specific endpoint, made reactive
  {
    // Explicitly set the base URL for all API requests
    baseURL: '/api', 
    async transform(response: { content: string }) {
      if (response && response.content) {
        return await marked(response.content);
      }
      return '<p>未能加载内容或内容为空。</p>';
    },
  }
);
</script>

<style scoped>
.details-card {
  margin: 20px;
}
</style> 