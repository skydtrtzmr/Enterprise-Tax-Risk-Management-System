<template>
  <div class="data-management-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>数据管理中心</h1>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-alert
            title="关于数据管理"
            type="info"
            description="本页面提供了对应用程序数据的管理功能。企业税收风险数据是动态变化的，及时的维护和管理对于风险监控的准确性至关重要。"
            show-icon
            :closable="false"
          />
        </el-col>
      </el-row>

      <el-divider />

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <span>数据源</span>
            </template>
            <div class="card-content">
              <p>本系统中的税收风险数据主要来源于：</p>
              <ul>
                <li>内部自查数据</li>
                <li>历史税务稽查案例</li>
                <li>国家最新税收政策法规</li>
                <li>行业特定风险点分析</li>
              </ul>
              <p>数据会定期进行更新以反映最新的风险状况。</p>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card shadow="hover">
            <template #header>
              <span>本地缓存管理</span>
            </template>
            <div class="card-content">
              <p>为了提升用户体验和系统性能，部分数据（如风险应对状态）会缓存在您的浏览器中。</p>
              <p>在大多数情况下，这可以加快页面的加载速度。但如果后台数据已更新，或者您遇到数据显示不一致的问题，您可以手动清理缓存以强制从服务器同步最新数据。</p>
              <br/>
              <el-button type="danger" @click="clearRiskStatusCache" :icon="Refresh">
                刷新数据 (清理本地缓存)
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';

const STORAGE_KEY = 'risk_statuses';

const clearRiskStatusCache = () => {
  ElMessageBox.confirm(
    '此操作将清除所有本地保存的风险应对状态，并恢复到初始状态。您确定要继续吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    localStorage.removeItem(STORAGE_KEY);
    ElMessage({
      type: 'success',
      message: '本地缓存清理成功！',
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '操作已取消',
    });
  });
};
</script>

<style scoped>
.data-management-container {
  padding: 20px;
}
.card-header {
  font-size: 20px;
  font-weight: bold;
}
.card-content ul {
  list-style-position: inside;
  padding-left: 0;
}
.card-content p {
  line-height: 1.6;
}
</style> 