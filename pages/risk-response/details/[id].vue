<template>
  <div class="page-container">
    <el-page-header @back="onBack">
      <template #title>
        <span class="back-title">返回列表</span>
      </template>
      <template #content>
        <span class="page-title">风险详情 (ID: {{ riskId }})</span>
      </template>
    </el-page-header>

    <el-card class="content-card" v-loading="pending">
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
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';

const route = useRoute();
const router = useRouter();
const riskId = computed(() => route.params.id as string);

const onBack = () => {
  router.back();
};

const {
  data: renderedMarkdown,
  pending,
  error,
  execute,
} = useFetch(() => `/risks/${riskId.value}`, {
  baseURL: '/api',
  immediate: false,
  watch: false,
  // 通过watch: flase 来避免重复请求
  async transform(response: { content: string }) {
    if (response && response.content) {
      return await marked(response.content);
    }
    return '<p>未能加载内容或内容为空。</p>';
  },
});

watch(
  riskId,
  (newId) => {
    if (newId) {
      execute();
    }
  },
  { immediate: true }
);
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

.content-card {
  margin-top: 24px;
  border-radius: 8px;
}

.error-state {
  padding: 20px;
}

.markdown-body {
  line-height: 1.6;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body :deep(h1) { font-size: 2em; }
.markdown-body :deep(h2) { font-size: 1.5em; }
.markdown-body :deep(h3) { font-size: 1.25em; }

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 2em;
}

.markdown-body :deep(code) {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f6f8fa;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  border-radius: 6px;
}

.markdown-body :deep(pre) {
  background-color: #f6f8fa;
  padding: 16px;
  overflow: auto;
  border-radius: 6px;
}
</style> 