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
            <ContentRenderer
                v-else-if="page"
                :value="page"
                class="markdown-body"
            />
            <div v-else class="error-state">
                <el-alert
                    title="内容未找到"
                    type="info"
                    :description="`未能找到 ID: ${riskId} 对应的风险详情。`"
                    show-icon
                    :closable="false"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const riskId = computed(() => route.params.id as string);

const onBack = () => {
    router.back();
};

const {
    data: page,
    pending,
    error,
} = useAsyncData(
    route.path,
    () => {
        return queryCollection("content").path(route.path).first();
    }
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
    padding: 20px;
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

.markdown-body :deep(h1) {
    font-size: 2em;
}
.markdown-body :deep(h2) {
    font-size: 1.5em;
}
.markdown-body :deep(h3) {
    font-size: 1.25em;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
    padding-left: 2em;
}

.markdown-body :deep(code) {
    font-family: "Courier New", Courier, monospace;
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
