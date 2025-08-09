<template>
  <div class="financial-report">
    <!-- 财务数据卡片1 - 独占第一行 -->
    <el-card>
      <div class="year-selector">
        <span style="white-space: nowrap;">选择年度：</span>
        <el-select v-model="selectedYear" placeholder="选择年份" style="width: 100px">
          <el-option
            v-for="year in availableYears"
            :key="year"
            :label="year"
            :value="year"
          />
        </el-select>
      </div>
      
      <el-row :gutter="20">
        <el-col :span="6" >
          <div class="financial-item item-1">
            <div class="financial-label">{{ financialSummary[0].label }}</div>
            <div class="financial-value">{{ financialSummary[0].value }}</div>
            <div class="financial-unit">{{ financialSummary[0].unit }}</div>
          </div>
        </el-col>
                <el-col :span="6" >
          <div class="financial-item item-2">
            <div class="financial-label">{{ financialSummary[1].label }}</div>
            <div class="financial-value">{{ financialSummary[1].value }}</div>
            <div class="financial-unit">{{ financialSummary[1].unit }}</div>
          </div>
        </el-col>
                <el-col :span="6" >
          <div class="financial-item item-3">
            <div class="financial-label">{{ financialSummary[2].label }}</div>
            <div class="financial-value">{{ financialSummary[2].value }}</div>
            <div class="financial-unit">{{ financialSummary[2].unit }}</div>
          </div>
        </el-col>
                <el-col :span="6" >
          <div class="financial-item item-4">
            <div class="financial-label">{{ financialSummary[3].label }}</div>
            <div class="financial-value">{{ financialSummary[3].value }}</div>
            <div class="financial-unit">{{ financialSummary[3].unit }}</div>
          </div>
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
          <div class="card-title">月度趋势分析</div>
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
          <div class="card-title">年度对比分析</div>
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
  title: { 
    text: '资产构成', 
    left: 'center',
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    }
  },
  tooltip: { 
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [{
    name: '资产构成',
    type: 'pie',
    radius: '50%',
    label: {
      show: true,
      formatter: '{b}: {d}%'
    },
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
  title: { 
    text: '收入构成', 
    left: 'center',
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold'
    }
  },
  tooltip: { 
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [{
    name: '收入构成',
    type: 'pie',
    radius: '50%',
    label: {
      show: true,
      formatter: '{b}: {d}%'
    },
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
    currentYear: [1200, 1300, 1321, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lastYear: [1100, 1120, 1250, 1360, 1450, 1550, 1572, 1750, 1850, 1950, 2050, 2150]
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
      },
      formatter: (params: any) => {
        let result = params[0].name + '<br/>';
        params.forEach((item: any) => {
          if (item.value !== '-') {
            result += `${item.seriesName}: ${item.value}万元<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['本月', '上月', '去年同期'],
      top: 0
    },
    grid: {
      top: '20%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.months
    },
    yAxis: {
      type: 'value',
      name: '单位：万元',
      nameLocation: 'end'
    },
    series: [
      {
        name: '本月',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: '#409EFF'
        },
        data: data.currentYear
      },
      {
        name: '上月',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#67C23A'
        },
        data: data.currentYear
      },
      {
        name: '去年同期',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#E6A23C'
        },
        data: data.lastYear
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
      data: data.months,
      axisLabel: {
        interval: 0,
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '2023年',
        type: 'bar',
        data: data.lastYear
      },
      {
        name: '2024年',
        type: 'bar',
        data: data.currentYear
      }
    ]
  };
});


</script>

<style scoped>
.financial-report {
  padding: 20px;
  background-color: #f0f2f5;
}

/* 财务数据样式 */
.year-selector {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.year-selector span {
  margin-right: 10px;
  font-size: 14px;
  color: #606266;
}

.financial-item {
  text-align: center;
  padding: 15px 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

/* 为每个卡片单独设置背景色 */
.item-1 {
  background-color: #ecf5ff; /* 资产总额 */
}
.item-2 {
  background-color: #f0f9eb; /* 收入总额 */
}
.item-3 {
  background-color: #fdf6ec; /* 利润总额 */
}
.item-4 {
  background-color: #fef0f0; /* 毛利率 */
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.pie-chart-container {
  margin-top: 10px;
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


</style>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style> 