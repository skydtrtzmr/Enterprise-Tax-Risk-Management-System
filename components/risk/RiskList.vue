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
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="ID" width="150" />
      <el-table-column prop="name" label="风险名称" min-width="300" />
      <el-table-column prop="year" label="风险年度" width="120" />
      <el-table-column prop="month" label="风险月份" width="120" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '未应对' ? 'danger' : 'success'" disable-transitions>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetails(scope.row)">详情</el-button>
          <el-button type="primary" link @click="createResponse(scope.row)">对策制定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Filter, Printer, Download } from '@element-plus/icons-vue';
// Import the risk data from the central file
import { allRisksData } from '~/server/data/risks';

const props = defineProps<{
  riskType: string;
}>();

const router = useRouter();

const statusFilter = ref('all');

const STORAGE_KEY = 'risk_statuses';

// Create a reactive reference of the imported data for this component instance
// Use structuredClone to ensure the original array is not mutated
const allRisks = ref(structuredClone(allRisksData));

onMounted(() => {
  const savedStatuses = localStorage.getItem(STORAGE_KEY);
  if (savedStatuses) {
    const statuses = JSON.parse(savedStatuses);
    allRisks.value.forEach(risk => {
      if (statuses[risk.id]) {
        risk.status = statuses[risk.id];
      }
    });
  }
});

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

const viewDetails = (row: { id: string }) => {
  router.push(`/risk-response/details/${row.id}`);
};

const createResponse = (row: { id: string }) => {
  const risk = allRisks.value.find(r => r.id === row.id);
  if (risk) {
    risk.status = '已应对';
    // Persist the change to localStorage
    const savedStatuses = localStorage.getItem(STORAGE_KEY);
    const statuses = savedStatuses ? JSON.parse(savedStatuses) : {};
    statuses[risk.id] = risk.status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  }
  router.push(`/risk-response/response/${row.id}`);
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