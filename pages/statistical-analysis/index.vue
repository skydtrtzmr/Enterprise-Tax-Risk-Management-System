<template>
    <el-container class="full-height">
        <!-- 侧边栏菜单 -->
        <el-aside width="240px" class="aside-menu">
            <div class="aside-header">
                <el-icon :size="20" color="#409eff"><Document /></el-icon>
                <span class="aside-title">统计分析</span>
            </div>
            <el-menu default-active="logisticmap" class="el-menu-vertical-demo">
                <el-sub-menu index="statistical-functions">
                    <template #title>
                        <el-icon><Money /></el-icon>
                        <span>财务分析</span>
                    </template>
                    <el-menu-item index="logisticmap">财务分析总览</el-menu-item>
                    <el-menu-item index="riskanalysis">财务分析详情</el-menu-item>
                    <!-- 可扩展其他二级菜单 -->
                </el-sub-menu>
                <el-sub-menu index="statistical-functions">
                    <template #title>
                        <el-icon><WarnTriangleFilled /></el-icon>
                        <span>风险分析</span>
                    </template>
                    <!-- <el-menu-item index="logisticmap">物流图分析</el-menu-item> -->
                    <!-- 可扩展其他二级菜单 -->
                </el-sub-menu>
                <el-sub-menu index="statistical-functions">
                    <template #title>
                        <el-icon><Tickets /></el-icon>
                        <span>发票分析</span>
                    </template>
                    <!-- <el-menu-item index="logisticmap">物流图分析</el-menu-item> -->
                    <!-- 可扩展其他二级菜单 -->
                </el-sub-menu>
                <el-sub-menu index="statistical-functions">
                    <template #title>
                        <el-icon><Upload /></el-icon>
                        <span>申报分析</span>
                    </template>
                    <!-- <el-menu-item index="logisticmap">物流图分析</el-menu-item> -->
                    <!-- 可扩展其他二级菜单 -->
                </el-sub-menu>
                <el-sub-menu index="statistical-functions">
                    <template #title>
                        <el-icon><Management /></el-icon>
                        <span>经营分析</span>
                    </template>
                    <!-- <el-menu-item index="logisticmap">物流图分析</el-menu-item> -->
                    <!-- 可扩展其他二级菜单 -->
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <!-- 主内容区域 -->
        <el-main class="content-main">
            <TestReport2 :riskLevel="'low'"/>
            <!-- 物流图弹窗 -->
            <el-dialog
                title="物流图分析"
                v-model="isDialogVisible1"
                width="90%"
                :before-close="handleClose"
            >
                <LogisticmapIframe />
            </el-dialog>
            <el-dialog
                title="物流图分析2"
                v-model="isDialogVisible2"
                width="90%"
                :before-close="handleClose2"
            >
                <LogisticmapIframe2 />
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LogisticmapIframe from "@/components/LogisticmapIframe.vue";
import { Document, Setting, WarnTriangleFilled, Money, Tickets, Management, UploadFilled, Upload } from "@element-plus/icons-vue";
import TestReport from '@/components/TestReport.vue';
import { useRoute } from '#imports';

// 使用与风险应对页面相同的状态管理逻辑
const activeMenu = useState('activeStatisticalMenu', () => 'logisticmap');

// 监听路由变化
const route = useRoute();
watch(
  () => route.path,
  () => {
    if (route.path === '/statistical-analysis') {
      activeMenu.value = 'logisticmap';
    }
  }
);

// 控制弹窗显示的响应式变量
const isDialogVisible1 = ref(false);

const isDialogVisible2 = ref(false);

// 点击查看物流图处理函数
const handleViewLogisticMap = () => {
    console.log("点击查看物流图"); // 添加控制台日志
    isDialogVisible1.value = true;
};

const handleViewLogisticMap2 = () => {
    console.log("点击查看物流图"); // 添加控制台日志
    isDialogVisible2.value = true;
};

// 弹窗关闭回调
const handleClose = () => {
    isDialogVisible1.value = false;
};

const handleClose2 = () => {
    isDialogVisible2.value = false;
};

// 添加键盘事件监听
const onKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key.toLowerCase() === "i") {
        handleViewLogisticMap();
    }
    if (e.shiftKey && e.key.toLowerCase() === "j") {
        handleViewLogisticMap2();
    }
};

// 生命周期钩子
onMounted(() => {
    window.addEventListener("keydown", onKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", onKeyPress);
});
</script>

<style scoped>
/* 复用风险自查侧边栏样式 */
.full-height {
    height: calc(100vh - 64px);
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

.content-main {
    padding: 20px;
    background-color: #f0f2f5;
}
</style>
