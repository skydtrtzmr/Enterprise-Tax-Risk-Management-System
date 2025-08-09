<template>
  <div class="test-report">
    <!-- 财务数据卡片1 - 独占第一行 -->
    <el-card>
      <el-row :gutter="20" align="middle">
        <el-col :span="4">
          <el-select v-model="selectedYear" placeholder="选择年份">
            <el-option
              v-for="year in availableYears"
              :key="year"
              :label="year"
              :value="year"
            />
          </el-select>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in financialSummary" :key="item.label">
              <div class="financial-item">
                <div class="financial-label">{{ item.label }}</div>
                <div class="financial-value">{{ item.value }}</div>
                <div class="financial-unit">{{ item.unit }}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <client-only>
            <v-chart class="chart" :option="assetPieOption" autoresize />
          </client-only>
        </el-col>
        <el-col :span="12">
          <client-only>
            <v-chart class="chart" :option="incomePieOption" autoresize />
          </client-only>
        </el-col>
      </el-row>
    </el-card>

    <!-- 原有风险测评卡片 -->

    <!-- 财务数据卡片2和3 - 同处一行 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <el-tabs v-model="activeTrendTab">
            <el-tab-pane label="资产总额" name="asset">
              <client-only>
                <v-chart class="chart" :option="trendOption" autoresize />
              </client-only>
            </el-tab-pane>
            <el-tab-pane label="收入总额" name="income"></el-tab-pane>
            <el-tab-pane label="利润总额" name="profit"></el-tab-pane>
            <el-tab-pane label="利润率" name="margin"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-tabs v-model="activeCompareTab">
            <el-tab-pane label="资产总额" name="asset">
              <client-only>
                <v-chart class="chart" :option="compareOption" autoresize />
              </client-only>
            </el-tab-pane>
            <el-tab-pane label="收入总额" name="income"></el-tab-pane>
            <el-tab-pane label="利润总额" name="profit"></el-tab-pane>
            <el-tab-pane label="利润率" name="margin"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { PropType } from 'vue';

// 财务数据相关
const selectedYear = ref(2024);
const availableYears = [2022, 2023, 2024];

const financialSummary = ref([
  { label: '资产总额', value: '5,280', unit: '万元' },
  { label: '收入总额', value: '3,420', unit: '万元' },
  { label: '利润总额', value: '620', unit: '万元' },
  { label: '毛利率', value: '18.1', unit: '%' }
]);

const assetPieOption = ref({
  title: { text: '资产构成', left: 'center' },
  tooltip: { trigger: 'item' },
  series: [{
    name: '资产构成',
    type: 'pie',
    radius: '50%',
    data: [
      { value: 3200, name: '流动资产' },
      { value: 1200, name: '固定资产' },
      { value: 600, name: '无形资产' },
      { value: 280, name: '其他资产' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
});

const incomePieOption = ref({
  title: { text: '收入构成', left: 'center' },
  tooltip: { trigger: 'item' },
  series: [{
    name: '收入构成',
    type: 'pie',
    radius: '50%',
    data: [
      { value: 2800, name: '主营业务收入' },
      { value: 420, name: '其他业务收入' },
      { value: 200, name: '营业外收入' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
});

// 趋势图表数据
const activeTrendTab = ref('asset');
const activeCompareTab = ref('asset');

const trendData = ref({
  asset: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    currentYear: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300],
    lastYear: [1100, 1150, 1250, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 2150]
  },
  income: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    currentYear: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
    lastYear: [700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250]
  },
  // 其他趋势数据...
});

const trendOption = computed(() => {
  const data = trendData.value[activeTrendTab.value as keyof typeof trendData.value];
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['本月', '上月', '去年同期']
    },
    xAxis: {
      type: 'category',
      data: data.months.slice(0, new Date().getMonth() + 1)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '本月',
        type: 'bar',
        data: data.currentYear.slice(0, new Date().getMonth() + 1)
      },
      {
        name: '上月',
        type: 'line',
        data: data.currentYear.slice(0, new Date().getMonth())
      },
      {
        name: '去年同期',
        type: 'line',
        data: data.lastYear.slice(0, new Date().getMonth() + 1)
      }
    ]
  };
});

const compareOption = computed(() => {
  const data = trendData.value[activeCompareTab.value as keyof typeof trendData.value];
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['2023年', '2024年']
    },
    xAxis: {
      type: 'category',
      data: data.months.slice(0, new Date().getMonth() + 1)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '2023年',
        type: 'bar',
        data: data.lastYear.slice(0, new Date().getMonth() + 1)
      },
      {
        name: '2024年',
        type: 'bar',
        data: data.currentYear.slice(0, new Date().getMonth() + 1)
      }
    ]
  };
});

// 原有风险测评相关

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

/* 财务数据样式 */
.financial-item {
  text-align: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.financial-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.financial-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.financial-unit {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
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