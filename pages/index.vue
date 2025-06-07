<template>
  <div class="page-container">
    <div class="upload-section">
      <el-upload
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        :show-file-list="false"
      >
        <el-button>
          <el-icon><Upload /></el-icon>
          <span style="margin-left: 5px">上传文件</span>
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            请上传文件（文件名以 "v0" 结尾为高风险，以 "v1" 结尾为低风险）
          </div>
        </template>
      </el-upload>
      <div v-if="fileName" class="file-info">
        当前文件: {{ fileName }} &rArr;
        <span :class="riskLevel === 'high' ? 'high' : riskLevel === 'low' ? 'low' : 'none'">
          {{ riskLevel === 'high' ? '高风险' : (riskLevel === 'low' ? '低风险' : '未识别') }}
        </span>
      </div>
    </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, markRaw } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import OneKeyScan from '~/components/OneKeyScan.vue'
import RiskPool from '~/components/RiskPool.vue'
import TestReport from '~/components/TestReport.vue'

const OneKeyScanComponent = markRaw(OneKeyScan)
const RiskPoolComponent = markRaw(RiskPool)
const TestReportComponent = markRaw(TestReport)

const riskLevel = ref<'low' | 'high' | 'none'>('none')
const fileName = ref('')

const handleFileChange = (file: UploadFile) => {
  const name = file.name || ''
  fileName.value = name

  const dotIndex = name.lastIndexOf('.')
  const baseName = dotIndex === -1 ? name : name.slice(0, dotIndex)

  if (baseName.endsWith('v0')) {
    riskLevel.value = 'high'
  } else if (baseName.endsWith('v1')) {
    riskLevel.value = 'low'
  } else {
    riskLevel.value = 'none'
    ElMessage.error('无法识别的文件名格式。请确保文件名在扩展名之前以 "v0" 或 "v1" 结尾。')
  }
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


const removeTab = (targetName: string) => {
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
</style> 