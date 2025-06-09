<template>
  <div>
    <div class="toolbar">
      <el-select v-model="statusFilter" placeholder="应对状态" clearable style="width: 120px;">
        <el-option label="所有" value="all"></el-option>
        <el-option label="未应对" value="unhandled"></el-option>
        <el-option label="已应对" value="handled"></el-option>
      </el-select>
      <el-button type="primary" :icon="Filter">过滤</el-button>
      <el-button :icon="Printer">打印</el-button>
      <el-button :icon="Download">导出</el-button>
    </div>
    <el-table :data="filteredData" stripe style="width: 100%" :header-cell-style="{ background: '#f5f7fa', color: '#606266' }">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="风险名称" min-width="300" />
      <el-table-column prop="year" label="风险年度" width="180" />
      <el-table-column prop="month" label="风险月份" width="120" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '未应对' ? 'danger' : 'success'" disable-transitions>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetails(scope.row)">详情</el-button>
          <el-button type="primary" link @click="createResponse(scope.row)">对策制定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Filter, Printer, Download } from '@element-plus/icons-vue';

const props = defineProps<{
  riskType: string;
}>();

const router = useRouter();

const statusFilter = ref('all');

// Mock data based on the screenshot
const allRisks = ref([
    { id: 1, type: 'jieshou', name: '期间费用变动率与营业收入变动率比对异常风险', year: '2022', month: '-', status: '未应对' },
    { id: 2, type: 'jieshou', name: '增值税不动产租赁税目申报金额与房产税比对异常风险', year: '2021,2022', month: '-', status: '未应对' },
    { id: 3, type: 'ceping', name: '买卖合同印花税比对存在差异', year: '2021', month: '-', status: '未应对' },
    { id: 4, type: 'ceping', name: '纳税人【银行存款】是否有期末余额委托付款进项转出风险', year: '2021,2022', month: '-', status: '未应对' },
    { id: 5, type: 'butie-SUB-2024-001', name: '纳税人【库存现金】是否有期末余额', year: '2020,2021,2022', month: '-', status: '未应对' },
    { id: 6, type: 'butie-SUB-2024-001', name: '非房地产企业房产未清算或未按公允价值清算，车辆、设备等资产损失未按规定进行资产损失申报的风险', year: '2020,2021,2022', month: '-', status: '未应对' },
    { id: 7, type: 'butie-SUB-2024-002', name: '土地未清算或未按公允价值清算少缴税款风险', year: '2020,2021,2022', month: '-', status: '未应对' },
    { id: 8, type: 'butie-SUB-2024-003', name: '存货未清算或未做视同销售处理少缴税款风险', year: '2020,2021,2022', month: '-', status: '已应对' },
    { id: 9, type: 'butie-SUB-2024-004', name: '应收类往来账户涉税风险模型', year: '2020,2021,2022', month: '-', status: '已应对' },
    { id: 10, type: 'butie-SUB-2024-005', name: '应付类往来账户涉税风险模型', year: '2020,2021,2022', month: '-', status: '已应对' },
]);

const tableData = ref<any[]>([]);

watch(() => props.riskType, (newType) => {
  // Filter risks based on the type (from the left menu)
  if (newType.startsWith('butie-')) {
    tableData.value = allRisks.value.filter(risk => risk.type === newType);
  } else if (newType === 'jieshou' || newType === 'ceping') {
    tableData.value = allRisks.value.filter(risk => risk.type === newType);
  } else if (newType === 'butie') { // a "parent" menu item for subsidies
    // When the main "subsidy" menu is active, show all subsidy risks
    tableData.value = allRisks.value.filter(risk => risk.type.startsWith('butie-'));
  } else {
    tableData.value = [];
  }
}, { immediate: true });

const filteredData = computed(() => {
  if (statusFilter.value === 'all' || !statusFilter.value) {
    return tableData.value;
  }
  const status = statusFilter.value === 'unhandled' ? '未应对' : '已应对';
  return tableData.value.filter(item => item.status === status);
});

const viewDetails = (row: { id: number }) => {
  router.push(`/risk-response/details/${row.id}`);
};

const createResponse = (row: { id: number }) => {
  const risk = allRisks.value.find(r => r.id === row.id);
  if (risk) {
    risk.status = '已应对';
  }
};
</script>

<style scoped>
.toolbar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style> 