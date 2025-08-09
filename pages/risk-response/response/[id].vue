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
                <el-dialog
            title="风险提示：车辆轨迹异常"
            v-model="isDialogVisible1"
            width="90%"
            :before-close="handleClose"
        >
            <HeatmapIframe src="/heatmap1.html" />
        </el-dialog>
        <el-dialog
            title="风险提示：车辆轨迹异常"
            v-model="isDialogVisible2"
            width="90%"
            :before-close="handleClose2"
        >
            <HeatmapIframe src="/heatmap2.html" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubsidyManagementDetail from "~/components/risk/SubsidyManagementDetail.vue";
import { marked } from 'marked';
import HeatmapIframe from "~/components/HeatmapIframe.vue";

// 控制弹窗显示的响应式变量
const isDialogVisible1 = ref(false);

const isDialogVisible2 = ref(false);

// 点击查看物流图处理函数
const handleViewLogisticMap = () => {
    console.log("点击查看物流图"); // 添加控制台日志
    isDialogVisible1.value = true;
};

const handleViewLogisticMap2 = () => {
    console.log("点击查看物流图"); // 添加控制台日志
    isDialogVisible2.value = true;
};

// 弹窗关闭回调
const handleClose = () => {
    isDialogVisible1.value = false;
};

const handleClose2 = () => {
    isDialogVisible2.value = false;
};

// 添加键盘事件监听
const onKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "i") {
        handleViewLogisticMap();
    }
    if (e.shiftKey && e.key.toLowerCase() === "j") {
        handleViewLogisticMap2();
    }
};

// 生命周期钩子
onMounted(() => {
    window.addEventListener("keydown", onKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", onKeyPress);
});

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
