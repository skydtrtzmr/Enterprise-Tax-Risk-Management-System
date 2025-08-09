<template>
    <el-container class="full-height">
        <el-aside width="240px" class="aside-menu">
            <div class="aside-header">
                <el-icon :size="20" color="#409eff"><TakeawayBox /></el-icon>
                <span class="aside-title">风险应对</span>
            </div>
            <el-menu
                :default-active="activeMenu"
                :default-openeds="defaultOpeneds"
                class="el-menu-vertical-demo"
                @select="handleMenuSelect"
            >
                <el-menu-item index="jieshou">
                    <el-icon><Document /></el-icon>
                    <span>接收风险</span>
                </el-menu-item>
                <el-menu-item index="ceping">
                    <el-icon><CreditCard /></el-icon>
                    <span>测评风险</span>
                </el-menu-item>
                <el-sub-menu index="butie">
                    <template #title>
                        <el-icon><Money /></el-icon>
                        <span>补贴管理系统</span>
                    </template>
                    <el-menu-item index="butie-SUB-2024-001"
                        >SUB-2024-001</el-menu-item
                    >
                    <el-menu-item index="butie-SUB-2024-002"
                        >SUB-2024-002</el-menu-item
                    >
                    <el-menu-item index="butie-SUB-2024-003"
                        >SUB-2024-003</el-menu-item
                    >
                    <el-menu-item index="butie-SUB-2024-004"
                        >SUB-2024-004</el-menu-item
                    >
                    <el-menu-item index="butie-SUB-2024-005"
                        >SUB-2024-005</el-menu-item
                    >
                    <el-menu-item index="butie-SUB-2024-006"
                        >SUB-2024-006</el-menu-item
                    >
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-main class="content-main">
            <RiskList :risk-type="activeMenu" />
        </el-main>

        <el-dialog
            title="风险提示：车辆轨迹异常"
            v-model="isDialogVisible1"
            width="90%"
            :before-close="handleClose"
        >
            <HeatmapIframe src="/heatmap1.html" />
        </el-dialog>
        <el-dialog
            title="风险提示：车辆轨迹异常"
            v-model="isDialogVisible2"
            width="90%"
            :before-close="handleClose2"
        >
            <HeatmapIframe src="/heatmap2.html" />
        </el-dialog>
    </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import RiskList from "~/components/risk/RiskList.vue";
import {
    Document,
    CreditCard,
    Money,
    TakeawayBox,
} from "@element-plus/icons-vue";
import HeatmapIframe from "~/components/HeatmapIframe.vue";

// Use useState to create a shared state that persists across page navigations.
// 'jieshou' is the initial value if the state doesn't exist yet.
const activeMenu = useState("activeRiskResponseMenu", () => "jieshou");

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

const handleMenuSelect = (index: string) => {
    activeMenu.value = index;
};

// Compute which sub-menu should be open based on the active menu item.
const defaultOpeneds = computed(() => {
    if (activeMenu.value.startsWith("butie")) {
        return ["butie"];
    }
    return [];
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
