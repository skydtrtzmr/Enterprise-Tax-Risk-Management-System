<template>
    <div class="page-container">
        <el-tabs
            v-model="activeTab"
            type="card"
            class="main-tabs"
            closable
            @tab-remove="removeTab"
        >
            <el-tab-pane
                v-for="item in openTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>

        <div class="tab-content">
            <template v-if="activeTab === 'one-key-scan'">
                <div v-if="!isAnalyzing" class="question-container">
                    <h3>60万元政府补助是否需要缴纳企业所得税？</h3>
                    <p class="subtitle">请根选择对应的处理方式：</p>
                    <div class="button-group">
                        <el-button type="danger" size="large" @click="startAnalysis('high')">缴纳企业所得税</el-button>
                        <el-button type="success" size="large" @click="startAnalysis('low')">不缴纳企业所得税</el-button>
                    </div>
                </div>

                <div v-if="isAnalyzing" class="analysis-progress">
                    <h3>{{ analysisStage }}</h3>
                    <el-progress
                        :percentage="progress"
                        :stroke-width="20"
                        striped
                        striped-flow
                    />
                </div>
            </template>
            <template v-else-if="activeComponent">
                <component
                    :is="activeComponent"
                    v-bind="activeComponentProps"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, markRaw } from "vue";
import type { TabPaneName } from "element-plus";
import OneKeyScan from "~/components/OneKeyScan.vue";
import TestReport from "~/components/TestReport.vue";

const OneKeyScanComponent = markRaw(OneKeyScan);
const TestReportComponent = markRaw(TestReport);

const riskLevel = ref<"low" | "high" | "none">("none");
const fileName = ref("");
const isAnalyzing = ref(false);
const progress = ref(0);
const analysisStage = ref("");

const startAnalysis = (selectedRisk: "high" | "low") => {
    fileName.value = "政府补助税务处理判断";
    riskLevel.value = "none";
    isAnalyzing.value = true;
    progress.value = 0;

    const analysisStages = [
        "正在初始化分析引擎...",
        "正在评估选择的税务处理方式...",
        "正在匹配相关税法条款...",
        "正在分析潜在税务风险...",
        "正在进行合规性检查...",
        "正在生成税务风险报告...",
    ];
    let stageIndex = 0;
    const intervalTime = 800;

    const runAnalysis = () => {
        if (stageIndex < analysisStages.length) {
            analysisStage.value = analysisStages[stageIndex];
            progress.value = Math.round(
                (stageIndex / analysisStages.length) * 100
            );
            stageIndex++;
            setTimeout(runAnalysis, intervalTime);
        } else {
            analysisStage.value = "分析完成";
            progress.value = 100;
            setTimeout(() => {
                isAnalyzing.value = false;
                riskLevel.value = selectedRisk;
                activeTab.value = "test-report";
            }, 500);
        }
    };

    runAnalysis();
};

const tabsMap = {
    "one-key-scan": {
        title: "智能问答",
        name: "one-key-scan",
        component: OneKeyScanComponent,
    },
    "test-report": {
        title: "测评报告",
        name: "test-report",
        component: TestReportComponent,
    },
};

const openTabs = shallowRef([
    tabsMap["one-key-scan"],
    tabsMap["test-report"],
]);
const activeTab = ref("one-key-scan");

const activeComponent = computed(() => {
    if (activeTab.value === 'one-key-scan') return null;
    const active = openTabs.value.find((tab) => tab.name === activeTab.value);
    return active ? active.component : null;
});

const activeComponentProps = computed(() => {
    if (activeTab.value === "test-report") {
        return { riskLevel: riskLevel.value, fileName: fileName.value };
    }
    return {};
});

const removeTab = (targetName: TabPaneName) => {
    const tabs = openTabs.value;
    let activeName = activeTab.value;

    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
            }
        });
    }

    activeTab.value = activeName;
    openTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>

<style scoped>
.page-container {
    padding: 20px;
}

.question-container {
    background: white;
    padding: 40px 20px;
    border-radius: 4px;
    text-align: center;
}
.question-container h3 {
    margin-bottom: 20px;
    font-size: 22px;
}
.question-container p {
    color: #606266;
    font-size: 14px;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 20px;
    text-align: left;
}
.question-container .subtitle {
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    color: #303133;
}
.button-group {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.main-tabs {
  margin-top: 20px;
}

:deep(.el-tabs__header) {
    margin: 0;
}

.tab-content {
    background-color: #f0f2f5;
    padding-top: 20px;
}

.analysis-progress {
    margin-top: 20px;
    background: white;
    padding: 40px 20px;
    border-radius: 4px;
    text-align: center;
}

.analysis-progress h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #303133;
}
</style>
