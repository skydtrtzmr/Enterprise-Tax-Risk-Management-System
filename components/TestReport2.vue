<template>
  <div class="test-report">
    <!-- <el-card>
      <el-row :gutter="20" align="middle">
        <el-col :span="6">
          <div class="score-section">
            <el-progress type="dashboard" :percentage="percentage" :color="colors">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}</span>
                <span class="percentage-label">综合得分</span>
              </template>
            </el-progress>
          </div>
        </el-col>
        <el-col :span="10">
          <h2 class="report-title">企业年度税务风险测评报告</h2>
          <p class="report-subtitle">
            根据您提交的数据，系统完成了 {{ totalChecks }} 项指标的全面检测，综合评定企业的税务健康状况。
          </p>
        </el-col>
        <el-col :span="8">
            <div v-if="riskLevel !== 'none'" :class="['risk-box', riskLevel]">
                 <div
                    class="risk-box-description"
                    v-if="riskLevel === 'high'"
                >
                    <p class="risk-box-description-title">检测完成</p>
                    <p>高风险！！</p>
                </div>
                <div
                    class="risk-box-description"
                    v-if="riskLevel === 'low'"
                >
                    <p class="risk-box-description-title">检测完成</p>
                    <p>无风险或风险较低</p>
                    <p class="risk-box-subtitle">请注意高新技术企业认定标准。</p>
                </div>
            </div>
        </el-col>
      </el-row>
    </el-card> -->

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card shadow="never" class="summary-card">
          <template #header>
            <div class="card-header">
              <span>涉税风险指标</span>
            </div>
          </template>
          <client-only>
            <v-chart class="chart" :option="barOption" autoresize />
          </client-only>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="summary-card">
          <template #header>
            <div class="card-header">
              <span>风险等级分布</span>
            </div>
          </template>
          <client-only>
            <v-chart class="chart" :option="pieOption" autoresize />
          </client-only>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" class="summary-card">
           <template #header>
            <div class="card-header">
              <span>核心风险摘要</span>
            </div>
          </template>
          <div class="risk-summary">
            <ul>
              <li v-for="item in coreRisks" :key="item.text">
                <el-tag :type="item.type" effect="dark" size="small">{{ item.tag }}</el-tag>
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>风险明细</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="dimension" label="风险维度" width="180"></el-table-column>
        <el-table-column prop="indicator" label="风险指标"></el-table-column>
        <el-table-column prop="description" label="风险描述"></el-table-column>
        <el-table-column prop="level" label="风险等级" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.level === '高' ? 'danger' : 'warning'">{{ scope.row.level }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { PropType } from 'vue';

type RiskLevel = 'low' | 'high' | 'none';

interface TableRow {
  dimension: string;
  indicator: string;
  description: string;
  level: string;
}

interface CoreRisk {
  text: string;
  tag: string;
  type: 'danger' | 'warning' | 'success' | 'info';
}

interface ReportData {
  percentage: number;
  totalChecks: number;
  bar: {
    categories: string[];
    values: number[];
  };
  pie: {
    value: number;
    name: string;
    itemStyle?: { color: string };
  }[];
  table: TableRow[];
  core: CoreRisk[];
}

const props = defineProps({
  riskLevel: {
    type: String as PropType<RiskLevel>,
    default: 'none',
  },  
});

const percentage = ref(85);
const totalChecks = ref(125);

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const tableData = ref<TableRow[]>([]);
const coreRisks = ref<CoreRisk[]>([]);

const highRiskData: ReportData = {
  percentage: 45,
  totalChecks: 150,
  bar: {
    categories: ['发票合规', '税务申报', '成本票据', '合同涉税', '关联交易'],
    values: [8, 12, 5, 9, 11]
  },
  pie: [
    { value: 18, name: '高风险', itemStyle: { color: '#f56c6c' } },
    { value: 20, name: '中风险', itemStyle: { color: '#e6a23c' } },
    { value: 7, name: '低风险', itemStyle: { color: '#67c23a' } },
  ],
  table: [
    { dimension: '发票管理', indicator: '发票开具异常', description: '存在大量连号、作废发票', level: '高' },
    { dimension: '税务申报', indicator: '增值税申报不一致', description: '申报表与财务报表数据差异大', level: '高' },
  ],
  core: [
      { text: '增值税申报数据与财务报表存在重大差异。', tag: '申报', type: 'danger' },
      { text: '存在大量作废及连号发票，可能面临虚开风险。', tag: '发票', type: 'danger' },
      { text: '部分大额采购缺少合规成本票据支撑。', tag: '成本', type: 'warning' },
  ]
};

const lowRiskData: ReportData = {
  percentage: 88,
  totalChecks: 110,
  bar: {
    categories: ['发票合规', '税务申报', '成本票据', '合同涉税', '关联交易'],
    values: [2, 1, 3, 1, 0]
  },
  pie: [
    { value: 1, name: '高风险', itemStyle: { color: '#f56c6c' } },
    { value: 3, name: '中风险', itemStyle: { color: '#e6a23c' } },
    { value: 15, name: '低风险', itemStyle: { color: '#67c23a' } },
  ],
  table: [
     { dimension: '成本管理', indicator: '部分差旅费用票据不合规', description: '少量差旅报销缺少有效凭证', level: '中' },
  ],
  core: [
      { text: '整体税务风险可控，未发现重大风险点。', tag: '综合', type: 'success' },
      { text: '部分差旅费用报销凭证不完整，建议规范化。', tag: '凭证', type: 'warning' },
  ]
};

const defaultData: ReportData = {
  percentage: 0,
  totalChecks: 0,
  bar: { categories: ['发票合规', '税务申报', '成本票据', '合同涉税', '关联交易'], values: [0, 0, 0, 0, 0]},
  pie: [ { value: 0, name: '无数据' } ],
  table: [],
  core: [ { text: '请先上传文件进行风险测评。', tag: '提示', type: 'info' } ]
};


const barOption = ref({});
const pieOption = ref({});

const updateReportData = (level: RiskLevel) => {
  let data: ReportData;
  if (level === 'high') {
    data = highRiskData;
  } else if (level === 'low') {
    data = lowRiskData;
  } else {
    data = defaultData;
  }

  percentage.value = data.percentage;
  totalChecks.value = data.totalChecks;
  tableData.value = data.table;
  coreRisks.value = data.core;
  
  barOption.value = {
    tooltip: {},
    xAxis: {
      data: data.bar.categories,
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {},
    series: [{
      name: '风险点数量',
      type: 'bar',
      data: data.bar.values
    }],
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    }
  };
  
  pieOption.value = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [{
      name: '风险等级分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data.pie
    }]
  };
};

watch(() => props.riskLevel, (newLevel) => {
  updateReportData(newLevel);
}, { immediate: true });


const tableRowClassName = ({ row }: { row: TableRow }) => {
  if (row.level === '高') {
    return 'danger-row';
  } else if (row.level === '中') {
    return 'warning-row';
  }
  return '';
};
</script>

<style scoped>
.test-report {
  padding: 20px;
  background-color: #f0f2f5;
}

.score-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.percentage-value {
  display: block;
  font-size: 28px;
  font-weight: bold;
}

.percentage-label {
  display: block;
  font-size: 14px;
  color: #606266;
}

.report-title {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 10px;
}

.report-subtitle {
  font-size: 14px;
  color: #909399;
}

.summary-card {
  height: 100%;
}

.card-header {
  font-weight: bold;
}

.chart {
  height: 250px;
}

.risk-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 250px;
  overflow-y: auto;
}

.risk-summary li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.risk-summary li .el-tag {
  margin-right: 10px;
  flex-shrink: 0;
}

.risk-box {
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
}

.risk-box.high {
    background-color: #f56c6c;
    color: white;
}

.risk-box.low {
    background-color: #67c23a;
    color: white;
}

.risk-box-description-title {
  font-size: 24px;
  font-weight: bold;
}

.risk-box-description {
    font-size: 42px;
    font-weight: bold;
}

.risk-box-description p {
    margin: 0;
    line-height: 1.4;
}

.risk-box-subtitle {
    font-size: 18px;
    font-weight: 500;
    margin-top: 8px;
}
</style>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style> 