<template>
  <div class="subsidy-management">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ risk.details.caseBackground.title }}</span>
        </div>
      </template>
      <p v-for="(p, i) in risk.details.caseBackground.paragraphs" :key="i">{{ p }}</p>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>补贴管理系统</span>
        </div>
      </template>
      <el-table :data="risk.projects" style="width: 100%" @row-click="handleRowClick" row-key="id"
        :expand-row-keys="expandedRowKeys"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div v-if="props.row.info" class="project-details">
              <h4>项目信息</h4>
              <el-descriptions :column="2" border>
                <el-descriptions-item label="项目名称">{{ props.row.info.name }}</el-descriptions-item>
                <el-descriptions-item label="补贴金额">{{ props.row.info.amount }}</el-descriptions-item>
                <el-descriptions-item label="申请日期">{{ props.row.info.applyDate }}</el-descriptions-item>
                <el-descriptions-item label="到账日期">{{ props.row.info.arrivalDate }}</el-descriptions-item>
                <el-descriptions-item label="补贴类型">{{ props.row.info.type }}</el-descriptions-item>
                <el-descriptions-item label="管理状态">{{ props.row.info.status }}</el-descriptions-item>
              </el-descriptions>
              <div v-for="table in props.row.tables" :key="table.title" class="detail-table">
                <h4>{{ table.title }}</h4>
                <el-table :data="transformDataForTable(table)" border size="small">
                    <el-table-column v-for="(header, index) in table.headers" :key="header" :prop="index.toString()" :label="header" />
                </el-table>
              </div>
            </div>
             <div v-else class="project-details">
              <p>暂无此项目的详细信息。</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="id" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElCard, ElTable, ElTableColumn, ElDescriptions, ElDescriptionsItem } from 'element-plus';

defineProps({
  risk: {
    type: Object,
    required: true,
  },
});

const expandedRowKeys = ref<string[]>([]);

const handleRowClick = (row: any) => {
  if (expandedRowKeys.value.includes(row.id)) {
    expandedRowKeys.value = [];
  } else {
    expandedRowKeys.value = [row.id];
  }
};

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
</script>

<style scoped>
.box-card {
  width: 100%;
}
.card-header {
  font-weight: bold;
}
.project-details {
    padding: 20px;
    background-color: #fafafa;
}
.detail-table {
    margin-top: 20px;
}
</style> 