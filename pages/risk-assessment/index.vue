<template>
  <div class="page-container">
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
          <div class="el-upload__tip">
            请上传文件（文件名以 "v0" 结尾为高风险，以 "v1" 结尾为低风险）
          </div>
        </template>
      </el-upload>
      <div v-if="!isAnalyzing && fileName" class="file-info">
        当前文件: <strong>{{ fileName }}</strong> &rArr;
        风险等级:
        <span :class="riskLevel === 'high' ? 'high' : riskLevel === 'low' ? 'low' : 'none'">
          {{ riskLevel === 'high' ? '高风险' : (riskLevel === 'low' ? '低风险' : '未识别') }}
        </span>
      </div>
    </div>

    <div v-if="isAnalyzing" class="analysis-progress">
      <h3>{{ analysisStage }}</h3>
      <el-progress :percentage="progress" :stroke-width="20" striped striped-flow />
    </div>

    <template v-else-if="fileName">
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
        <template v-if="activeComponent">
          <component :is="activeComponent" v-bind="activeComponentProps" />
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, markRaw } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, TabPaneName } from 'element-plus'
import OneKeyScan from '~/components/OneKeyScan.vue'
import RiskPool from '~/components/RiskPool.vue'
import TestReport from '~/components/TestReport.vue'

const OneKeyScanComponent = markRaw(OneKeyScan)
const RiskPoolComponent = markRaw(RiskPool)
const TestReportComponent = markRaw(TestReport)

const riskLevel = ref<'low' | 'high' | 'none'>('none')
const fileName = ref('')
const isAnalyzing = ref(false)
const progress = ref(0)
const analysisStage = ref('')

const handleFileChange = (file: UploadFile) => {
  const name = file.name || ''

  const dotIndex = name.lastIndexOf('.')
  const baseName = dotIndex === -1 ? name : name.slice(0, dotIndex)

  let newRiskLevel: 'low' | 'high' | 'none' = 'none'

  if (baseName.endsWith('v0')) {
    newRiskLevel = 'high'
  } else if (baseName.endsWith('v1')) {
    newRiskLevel = 'low'
  } else {
    riskLevel.value = 'none'
    fileName.value = ''
    ElMessage.error('无法识别的文件名格式。请确保文件名在扩展名之前以 "v0" 或 "v1" 结尾。')
    return
  }

  fileName.value = name
  riskLevel.value = 'none'
  isAnalyzing.value = true
  progress.value = 0
  
  const analysisStages = [
    '正在初始化分析引擎...',
    '正在进行税务风险扫描...',
    '正在分析发票数据...',
    '正在比对合同信息...',
    '正在进行历史数据比对...',
    '正在生成税务风险报告...',
  ]
  let stageIndex = 0
  const intervalTime = 2000 // 2 seconds per stage

  const runAnalysis = () => {
    if (stageIndex < analysisStages.length) {
      analysisStage.value = analysisStages[stageIndex]
      progress.value = Math.round((stageIndex / analysisStages.length) * 100)
      stageIndex++
      setTimeout(runAnalysis, intervalTime)
    } else {
      analysisStage.value = '分析完成'
      progress.value = 100
      setTimeout(() => {
        isAnalyzing.value = false
        riskLevel.value = newRiskLevel
        activeTab.value = 'test-report'
      }, 500)
    }
  }

  runAnalysis()
}

const tabsMap = {
  'one-key-scan': { title: '一键扫描', name: 'one-key-scan', component: OneKeyScanComponent },
  'risk-pool': { title: '风险池', name: 'risk-pool', component: RiskPoolComponent },
  'test-report': { title: '测评报告', name: 'test-report', component: TestReportComponent },
}

const openTabs = shallowRef([
    tabsMap['one-key-scan'],
    tabsMap['risk-pool'],
    tabsMap['test-report']
])
const activeTab = ref('test-report')

const activeComponent = computed(() => {
  const active = openTabs.value.find(tab => tab.name === activeTab.value)
  return active ? active.component : null;
})

const activeComponentProps = computed(() => {
  if (activeTab.value === 'test-report') {
    return { riskLevel: riskLevel.value }
  }
  return {}
})


const removeTab = (targetName: TabPaneName) => {
  const tabs = openTabs.value
  let activeName = activeTab.value

  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  activeTab.value = activeName
  openTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<style scoped>
.page-container {
  padding: 0 20px;
}

.upload-section {
  background: white;
  padding: 15px 20px;
  margin-top: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.file-info {
  font-size: 14px;
}
.file-info .low {
  color: #00c484;
  font-weight: bold;
}
.file-info .high {
  color: red;
  font-weight: bold;
}
.file-info .none {
  color: #909399;
  font-weight: bold;
}

.main-tabs {
  margin-top: 20px;
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