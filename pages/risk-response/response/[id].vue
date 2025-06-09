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
            <SubsidyManagementDetail
                v-if="riskId === 'SUB-TAX-01'"
                :project-id="riskId"
            />

            <!-- Fallback to the generic response page for all other risks -->
            <el-card v-else class="content-card">
                <div
                    class="markdown-body"
                    v-html="renderedMarkdown"
                ></div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubsidyManagementDetail from "~/components/risk/SubsidyManagementDetail.vue";
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
} = useFetch(() => `/solutions/${riskId.value}`, {
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
    if (newId && newId !== 'SUB-TAX-01') {
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

.content-wrapper {
    margin-top: 24px;
}

.content-card {
    border-radius: 8px;
}

.markdown-body {
  padding: 20px;
  line-height: 1.6;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #dfe2e5;
  padding: 8px 12px;
}

.markdown-body :deep(th) {
  background-color: #f6f8fa;
  font-weight: 600;
  text-align: left;
}

.markdown-body :deep(tr:nth-of-type(2n)) {
  background-color: #f6f8fa;
}
</style>
