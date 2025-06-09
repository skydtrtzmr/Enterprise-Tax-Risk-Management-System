<template>
  <div class="risk-list-container">
    <div class="table-toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item label="应对状态:">
          <el-select v-model="filters.status" placeholder="所有" clearable @change="handleFilter">
            <el-option label="所有" value=""></el-option>
            <el-option label="未应对" value="pending"></el-option>
            <el-option label="已应对" value="completed"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="toolbar-actions">
        <el-button :icon="Printer" @click="handlePrint">打印</el-button>
        <el-button :icon="Download" @click="handleExport">导出</el-button>
      </div>
    </div>

    <el-table :data="filteredData" stripe class="risk-table">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="风险名称" show-overflow-tooltip />
      <el-table-column prop="year" label="风险年度" width="180" />
      <el-table-column prop="month" label="风险月份" width="120" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === '未应对' ? 'danger' : 'success'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleViewDetails(row)">详情</el-button>
          <el-button type="primary" link @click="handleCreateResponse(row)">对策制定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Printer, Download } from '@element-plus/icons-vue';

const props = defineProps<{
  category: string;
}>();

// Filters
const filters = reactive({
  status: '',
});

const handleFilter = () => {
  // This is now just for manual filtering if needed.
  // The main filtering is done by the computed property.
  ElMessage.info(`筛选状态: ${filters.status || '所有'}`);
};

const handlePrint = () => { ElMessage.info('触发打印操作'); };
const handleExport = () => { ElMessage.info('触发导出操作'); };

// Mock Data - this would eventually come from a store or API call
const allRisks = ref([
    { id: 1, name: '期间费用变动与营业收入变动率配比异常风险', year: '2022', month: '-', status: '未应对', category: 'four-flows' },
    { id: 2, name: '增值税不动产租赁税目申报金额与房产税比对异常风险', year: '2021,2022', month: '-', status: '未应对', category: 'rd-deduction' },
    { id: 3, name: '买卖合同印花税比对存在差异', year: '2020,2021', month: '-', status: '已应对', category: 'four-flows' },
    { id: 4, name: '纳税人【银行存款】是否有期末余额', year: '2020,2021,2022', month: '-', status: '未应对', category: 'rd-deduction' },
    { id: 5, name: '新型锂电池材料研发补贴误缴税款风险', year: '2020,2021,2022', month: '-', status: '未应对', category: 'subsidy-management-SUB-2024-001' },
    { id: 6, name: '非房地产企业房产未清算或未按公允价值清算风险', year: '2022', month: '-', status: '已应对', category: 'four-flows'},
    { id: 7, name: '土地未清算或未按公允价值清算少缴税款风险', year: '2021', month: '-', status: '未应对', category: 'rd-deduction' },
    { id: 8, name: '另一项补贴管理风险', year: '2023', month: '-', status: '未应对', category: 'subsidy-management-SUB-2024-002' },
]);

const filteredData = computed(() => {
  return allRisks.value.filter(risk => {
    const categoryMatch = risk.category === props.category;
    const statusMatch = !filters.status || (filters.status === 'completed' && risk.status === '已应对') || (filters.status === 'pending' && risk.status === '未应对');
    return categoryMatch && statusMatch;
  });
});

const router = useRouter();

const handleViewDetails = (row: any) => {
  router.push(`/risk-response/details/${row.id}`);
};

const handleCreateResponse = (row: any) => {
  // Here you could navigate to a specific page for creating a response,
  // potentially passing the risk ID or other relevant data.
  ElMessage.info(`为风险 "${row.name}" 制定对策`);
};
</script>

<style scoped>
.risk-list-container {
  padding: 0;
}
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.toolbar-actions {
  display: flex;
  align-items: center;
}
.risk-table {
  width: 100%;
}
</style> 