<template>
  <div class="rd-expense-deduction">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>风险详情</span>
        </div>
      </template>
      
      <div class="detail-section">
        <el-table :data="workHoursData" border style="width: 100%">
          <template #header>
            <div class="table-title">{{ risk.details.workHours.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.details.workHours.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>

      <div class="detail-section">
         <el-table :data="attendanceData" border style="width: 100%">
          <template #header>
            <div class="table-title">{{ risk.details.attendance.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.details.attendance.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>
      
       <div class="detail-section">
         <el-table :data="experimentLogsData" border style="width: 100%">
           <template #header>
            <div class="table-title">{{ risk.details.experimentLogs.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.details.experimentLogs.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>

       <div class="detail-section">
         <el-table :data="materialRecordsData" border style="width: 100%">
           <template #header>
            <div class="table-title">{{ risk.details.materialRecords.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.details.materialRecords.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>

    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>对策制定</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="风险描述">{{ risk.countermeasure.description }}</el-descriptions-item>
        <el-descriptions-item label="参考指引">{{ risk.countermeasure.guidance }}</el-descriptions-item>
      </el-descriptions>

      <div class="detail-section">
        <el-table :data="comparisonData" border style="width: 100%">
           <template #header>
            <div class="table-title">{{ risk.countermeasure.comparisonTable.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.countermeasure.comparisonTable.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>

      <div class="detail-section">
        <el-table :data="deductionComparisonData" border style="width: 100%">
           <template #header>
            <div class="table-title">{{ risk.countermeasure.deductionComparison.title }}</div>
          </template>
          <el-table-column v-for="(header, index) in risk.countermeasure.deductionComparison.headers" :key="header" :prop="index.toString()" :label="header" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn, ElDescriptions, ElDescriptionsItem } from 'element-plus';

const props = defineProps({
  risk: {
    type: Object,
    required: true,
  },
});

// Since the `prop` for el-table-column needs to be a string key, we transform
// the array-of-arrays data into an array-of-objects.
const transformDataForTable = (data: any) => {
    if (!data || !data.rows || !data.headers) return [];
    return data.rows.map((row: any[]) => {
        const obj: Record<string, any> = {};
        data.headers.forEach((header: string, index: number) => {
            obj[index.toString()] = row[index];
        });
        return obj;
    });
};

const workHoursData = transformDataForTable(props.risk.details.workHours);
const attendanceData = transformDataForTable(props.risk.details.attendance);
const experimentLogsData = transformDataForTable(props.risk.details.experimentLogs);
const materialRecordsData = transformDataForTable(props.risk.details.materialRecords);
const comparisonData = transformDataForTable(props.risk.countermeasure.comparisonTable);
const deductionComparisonData = transformDataForTable(props.risk.countermeasure.deductionComparison);

</script>

<style scoped>
.box-card {
  width: 100%;
}
.card-header {
  font-weight: bold;
}
.detail-section {
  margin-bottom: 20px;
}
.table-title {
    font-weight: bold;
    padding: 10px;
    text-align: center;
    font-size: 16px;
}
</style> 