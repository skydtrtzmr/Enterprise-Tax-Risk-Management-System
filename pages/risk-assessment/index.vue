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
                <div class="upload-section">
                    <el-upload
                        drag
                        action="#"
                        :auto-upload="false"
                        :on-change="handleFileChange"
                        :show-file-list="false"
                        class="upload-dragger"
                        :disabled="isAnalyzing"
                    >
                        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">请上传文件</div>
                        </template>
                    </el-upload>
                    <div class="info-panel">
                        <div
                            v-if="!isAnalyzing && fileName && riskLevel !== 'none'"
                            class="result-display"
                        >
                            <p class="file-name-display">
                                当前文件: <strong>{{ fileName }}</strong>
                            </p>
                            <div :class="['risk-box', riskLevel]">
                                <div
                                    class="risk-box-description"
                                    v-if="riskLevel === 'high'"
                                >
                                    <p>检测完成，高风险！！</p>
                                </div>
                                <div
                                    class="risk-box-description"
                                    v-if="riskLevel === 'low'"
                                >
                                    <p>检测完成，无风险或风险较低。</p>
                                    <p>请注意高新技术企业认定标准。</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="instructions">
                            <h4>风险测评使用说明</h4>
                            <ul>
                                <li>点击或拖拽您的税务报表文件到左侧上传区域。</li>
                                <li>
                                    系统将对文件进行智能分析，请确保文件名符合规范。
                                </li>
                                <li>分析过程将持续数秒，请耐心等待。</li>
                                <li>完成后，系统将展示详细的风险等级和测评报告。</li>
                            </ul>
                        </div>
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
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadFile, TabPaneName } from "element-plus";
import OneKeyScan from "~/components/OneKeyScan.vue";
import RiskPool from "~/components/RiskPool.vue";
import TestReport from "~/components/TestReport.vue";

const OneKeyScanComponent = markRaw(OneKeyScan);
const RiskPoolComponent = markRaw(RiskPool);
const TestReportComponent = markRaw(TestReport);

const riskLevel = ref<"low" | "high" | "none">("none");
const fileName = ref("");
const isAnalyzing = ref(false);
const progress = ref(0);
const analysisStage = ref("");

const handleFileChange = (file: UploadFile) => {
    const name = file.name || "";

    const dotIndex = name.lastIndexOf(".");
    const baseName = dotIndex === -1 ? name : name.slice(0, dotIndex);

    let newRiskLevel: "low" | "high" | "none" = "none";

    if (baseName.endsWith("v0")) {
        newRiskLevel = "high";
    } else if (baseName.endsWith("v1")) {
        newRiskLevel = "low";
    } else {
        riskLevel.value = "none";
        fileName.value = "";
        ElMessage.error("无法识别的文件名格式。");
        return;
    }

    fileName.value = name;
    riskLevel.value = "none";
    isAnalyzing.value = true;
    progress.value = 0;

    const analysisStages = [
        "正在进行税务风险扫描...",
        "正在分析发票数据...",
        "正在比对合同信息...",
        "正在进行历史数据比对...",
        "正在生成税务风险报告...",
    ];
    let stageIndex = 0;
    const intervalTime = 2000; // 2 seconds per stage

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
                riskLevel.value = newRiskLevel;
                activeTab.value = "test-report";
            }, 500);
        }
    };

    runAnalysis();
};

const tabsMap = {
    "one-key-scan": {
        title: "一键扫描",
        name: "one-key-scan",
        component: OneKeyScanComponent,
    },
    "risk-pool": {
        title: "风险池",
        name: "risk-pool",
        component: RiskPoolComponent,
    },
    "test-report": {
        title: "测评报告",
        name: "test-report",
        component: TestReportComponent,
    },
};

const openTabs = shallowRef([
    tabsMap["one-key-scan"],
    tabsMap["risk-pool"],
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
        return { riskLevel: riskLevel.value };
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

.upload-section {
    background: white;
    padding: 15px 20px;
    margin-top: 20px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    gap: 20px;
}

.info-panel {
    flex: 1;
    padding: 10px 10px 10px 30px;
    border-left: 1px solid #e4e7ed;
}

.instructions h4 {
    margin-top: 0;
    font-size: 16px;
    color: #303133;
    margin-bottom: 15px;
}

.instructions ul {
    padding-left: 20px;
    margin: 0;
    font-size: 13px;
    color: #606266;
    line-height: 1.8;
}

.result-display .file-name-display {
    font-size: 14px;
    margin-bottom: 10px;
    color: #606266;
}

.risk-box {
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    color: white;
}

.risk-box.high {
    background-color: #fde2e2;
    border: 1px solid #f56c6c;
    color: #f56c6c;
}

.risk-box.low {
    background-color: #e9f9f4;
    border: 1px solid #67c23a;
    color: #67c23a;
}

.risk-box-title {
    font-size: 14px;
    margin-bottom: 5px;
}

.risk-box-level {
    font-size: 28px;
    font-weight: bold;
}

.risk-box-description {
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
}

.main-tabs {
    /* margin-top: 20px; */
}

:deep(.el-tabs__header) {
    margin: 0;
}

.tab-content {
    background-color: #f0f2f5;
}

.upload-dragger {
    flex: 1;
    min-width: 300px;
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
