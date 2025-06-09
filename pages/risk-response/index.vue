<template>
  <el-container class="full-height">
    <el-aside width="240px" class="aside-menu">
      <div class="aside-header">
        <el-icon :size="20" color="#409eff"><TakeawayBox /></el-icon>
        <span class="aside-title">风险应对</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
      >
        <el-menu-item index="four-flows">
          <el-icon><Document /></el-icon>
          <span>接收风险</span>
        </el-menu-item>
        <el-menu-item index="rd-deduction">
          <el-icon><CreditCard /></el-icon>
          <span>测评风险</span>
        </el-menu-item>
        <el-sub-menu index="subsidy-management">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>补贴管理系统</span>
          </template>
          <el-menu-item index="subsidy-management-SUB-2024-001">SUB-2024-001</el-menu-item>
          <el-menu-item index="subsidy-management-SUB-2024-002">SUB-2024-002</el-menu-item>
          <el-menu-item index="subsidy-management-SUB-2024-003">SUB-2024-003</el-menu-item>
          <el-menu-item index="subsidy-management-SUB-2024-004">SUB-2024-004</el-menu-item>
          <el-menu-item index="subsidy-management-SUB-2024-005">SUB-2024-005</el-menu-item>
          <el-menu-item index="subsidy-management-SUB-2024-006">SUB-2024-006</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main class="content-main">
      <!-- 根据选择的菜单项显示不同内容 -->
      <div v-if="activeTab === 'four-flows'">
        <!-- 接收风险的内容将放在这里 -->
        <h2>接收风险</h2>
      </div>
      <div v-if="activeTab === 'rd-deduction'">
        <!-- 测评风险的内容将放在这里 -->
        <h2>测评风险</h2>
      </div>
      <div v-if="activeTab === 'subsidy-management'">
        <SubsidyManagementDetail
          v-if="activeMenu.startsWith('subsidy-management-')"
          :project-id="activeMenu.replace('subsidy-management-', '')"
        />
        <div v-else class="empty-state">
          <h2>补贴管理</h2>
          <p>请在左侧选择一个项目查看详情。</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SubsidyManagementDetail from '~/components/risk/SubsidyManagementDetail.vue';
import {
  Document,
  CreditCard,
  Money,
  TakeawayBox
} from '@element-plus/icons-vue'

const activeMenu = ref('four-flows'); // 默认显示第一个

const handleMenuSelect = (index: string) => {
  activeMenu.value = index;
};

const activeTab = computed(() => {
  if (activeMenu.value.startsWith('subsidy-management')) {
    return 'subsidy-management';
  }
  return activeMenu.value;
});
</script>

<style scoped>
.full-height {
  height: calc(100vh - 64px); /* Full height minus header */
}

.aside-menu {
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
}

.aside-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.aside-title {
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  color: #303133;
}

.el-menu-vertical-demo {
  border-right: none;
}

.el-menu-item {
  font-size: 14px;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
}

.content-main {
  padding: 20px;
  background-color: #f0f2f5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #909399;
}
</style> 