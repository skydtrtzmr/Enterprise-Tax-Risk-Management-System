<template>
    <el-container class="layout-container">
        <el-header class="main-header">
            <div class="header-left">
                <div class="title">企业税收风险管理系统 F8</div>
                <!-- <div class="subtitle">【已授权】中比新能源科技有限公司</div> -->
            </div>
            <div class="header-center">
                <NuxtLink to="/data-management" class="nav-item">
                    <el-icon :size="24"><DataAnalysis /></el-icon>
                    <div>数据管理</div>
                </NuxtLink>
                <NuxtLink to="/risk-assessment" class="nav-item">
                    <el-icon :size="24"><Platform /></el-icon>
                    <div>风险测评</div>
                </NuxtLink>
                <NuxtLink to="/risk-response" class="nav-item">
                    <el-icon :size="24"><TakeawayBox /></el-icon>
                    <div>风险应对</div>
                </NuxtLink>
                <NuxtLink to="/self-inspection" class="nav-item">
                    <el-icon :size="24"><Finished /></el-icon>
                    <div>风险自查</div>
                </NuxtLink>
                <NuxtLink to="/statistical-analysis" class="nav-item">
                    <el-icon :size="24"><TrendCharts /></el-icon>
                    <div>统计分析</div>
                </NuxtLink>
            </div>
            <div class="header-right">
                <el-dropdown trigger="click" class="message-dropdown">
                    <el-badge :value="unreadMessages.length" class="message-badge">

                        <el-icon :size="28" style="color: #ffffff"
                            ><Message
                        /></el-icon>
                    </el-badge>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="msg in unreadMessages"
                                :key="msg.id"
                            >
                                <div
                                    class="message-item"
                                    @click="showDetail(msg)"
                                >
                                    <div class="message-title" >
                                        {{ msg.title }}
                                    </div>
                                    <div class="message-type">
                                        {{ msg.riskType }}
                                    </div>
                                    <!-- <div class="message-content">{{ msg.content }}</div> -->
                                    <div class="message-time">
                                        {{ formatTime(msg.time) }}
                                    </div>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-icon :size="28"><User /></el-icon>
                <span>当前身份：</span><span style="font-weight: bold;">税务管理</span>
            </div>
        </el-header>
        <el-main class="main-content">
            <slot />
        </el-main>
    </el-container>
    <el-dialog
        v-model="detailVisible"
        :title="selectedMessage?.title"
        width="450px"
        custom-class="risk-dialog"
    >
        <template #header>
            <div class="dialog-header">
                <el-icon><Warning /></el-icon>
                <span class="dialog-title">{{ selectedMessage?.title }}</span>
                <el-tag type="warning" size="small">未读</el-tag>
            </div>
        </template>

        <el-divider />

        <div class="dialog-content">
            <div class="content-row">
                <span class="label">风险类型：</span>
                <span class="value">{{
                    selectedMessage?.riskType || "通用风险"
                }}</span>
            </div>
            <div class="content-row">
                <span class="label">发现时间：</span>
                <span class="value time">{{
                    formatTime(selectedMessage?.time)
                }}</span>
            </div>
            <el-divider content-position="left">风险描述</el-divider>
            <div class="risk-description">
                {{ selectedMessage?.content }}
            </div>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="detailVisible = false"
                    >标记已读</el-button
                >
                <el-button @click="handleViewLogisticMap">查看详情</el-button>
            </div>
        </template>
    </el-dialog>
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
</template>

<script setup lang="ts">
import {
    DataAnalysis,
    Platform,
    TakeawayBox,
    Finished,
    TrendCharts,
    User,
    Message,
} from "@element-plus/icons-vue";

const { authUser, logout } = useAuth()
const unreadVisible = ref(false);
const detailVisible = ref(false);
const selectedMessage = ref();
const unreadMessages = ref([
    {
        id: 1,
        title: "新风险预警！",
        riskType: "四流不一致",
        content: "发票流与货物流不一致。",
        time: new Date("2024-03-12"),
    },

    {
        id: 2,
        title: "新风险预警！",
        riskType: "上下游一致的过票行为",
        content: "开具发票商品编码类似接收发票商品编码。",
        time: new Date("2024-03-12"),
    },
    
    {
        id: 3,
        title: "新风险预警！",
        riskType: "进项发票高危品目",
        content: "敏感商品发票金额，取得虚开发票风险。",
        time: new Date("2024-03-12"),
    },
    
    {
        id: 4,
        title: "新风险预警！",
        riskType: "四流不一致",
        content: "发票流与货物流不一致。",
        time: new Date("2024-03-15"),
    },
]);
// 新增方法
const showDetail = (msg: any) => {
    selectedMessage.value = msg;
    detailVisible.value = true;
    unreadVisible.value = false;
};

const formatTime = (timestamp: any) => {
    return new Date(timestamp).toLocaleDateString();
};

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

// 这个不要放在page/index.vue就不会出问题了。
useHead({
    script: [
        {
            innerHTML: `
                window.difyChatbotConfig = {
  token: 'OQcJr3tsihy4PNui',
  baseUrl: 'http://localhost',
  systemVariables: {
    // user_id: 'YOU CAN DEFINE USER ID HERE',
    // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
  },
  userVariables: {
    // avatar_url: 'YOU CAN DEFINE USER AVATAR URL HERE',
    // name: 'YOU CAN DEFINE USER NAME HERE',
  },
 }
            `,
            type: "text/javascript",
        },
        {
            src: "/scripts/embed.min.js",
            id: "S5qckSjGKqfJycCP",
            defer: true,
        },
    ],
});
</script>

<style>
body {
    margin: 0;
    background-color: #f0f2f5; /* Match main content bg for seamless feel */
}
</style>

<style scoped>
.message-badge {
    margin-right: 20px;
    cursor: pointer;
}

/* .message-dropdown {
  width: 250px;
} */

.el-dropdown-menu__item {
    white-space: normal;
    line-height: 1.5;
}
@keyframes header-fade-in {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes nav-item-fade-in {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.layout-container {
    height: 100vh;
}
.main-header {
    /* 更具科技感的渐变背景 */
    background-color: #1e40af; /* 后备颜色 */
    background-image: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); /* 与渐变色匹配的阴影 */
    position: relative;
    z-index: 100;
    padding: 0 24px;
    animation: header-fade-in 0.6s ease-out;
    overflow: hidden; /* 隐藏伪元素溢出的部分 */
}

/* 使用伪元素在头部右侧添加局部装饰性条纹 */
.main-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 25%; /* 条纹区域宽度 */
    height: 100%;
    background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 5px,
        rgba(255, 255, 255, 0.06) 5px,
        rgba(255, 255, 255, 0.06) 10px
    );
    pointer-events: none; /* 确保不影响鼠标交互 */
}

.header-left .title {
    font-size: 24px; /* Larger */
    font-weight: 600; /* semi-bold */
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.header-left .subtitle {
    font-size: 12px;
    /* color: #a0cfff; */
    color: #4dc4ff; /* A more vibrant cyan/light blue */
    font-weight: bold;
}

.header-center {
    display: flex;
    height: 100%;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 20px;
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    color: #c0d3f0; /* Softer white for inactive items */
    height: 100%;
    box-sizing: border-box;

    /* for animation */
    opacity: 0;
    animation: nav-item-fade-in 0.5s ease-out forwards;
}

.time-align {
    text-align: right;
    margin: 10px 0;
    color: #909399;
}

.header-center .nav-item:nth-child(1) {
    animation-delay: 0.3s;
}
.header-center .nav-item:nth-child(2) {
    animation-delay: 0.4s;
}
.header-center .nav-item:nth-child(3) {
    animation-delay: 0.5s;
}
.header-center .nav-item:nth-child(4) {
    animation-delay: 0.6s;
}
.header-center .nav-item:nth-child(5) {
    animation-delay: 0.7s;
}

/* 菜单项之间的分割线 */
.nav-item:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 48px;
    background: linear-gradient(
        to bottom,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
    );
}

.nav-item:hover {
    /* background-color: rgba(255, 255, 255, 0.1); */
    color: white;
}

.nav-item::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #43aaff, #007bff);
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
}

.nav-item:hover::after {
    width: 70%;
}

.nav-item.router-link-exact-active {
    /* background-color: #409eff; */
    color: white;
    font-weight: bold;
}

.nav-item.router-link-exact-active::after {
    width: 70%;
    box-shadow: 0 0 10px #007bff, 0 0 5px #43aaff;
}

.header-right {
    display: flex;
    /* align-items: center; */
}

.header-right .el-icon {
    margin-right: 8px;
}

.main-content {
    padding: 0;
    background-color: #f0f2f5;
    height: calc(100vh - 64px); /* Adjusted for new header height */
    overflow-y: auto;
}

.message-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    padding: 8px 12px;
}

.message-title {
    font-weight: bold;
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.message-type {

    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px;
}

.message-time {
    margin-left: auto;
    color: #909399;
    font-size: 0.9em;
}
</style>

<style scoped>
/* 新增对话框样式 */
.dialog-header {
    padding-top: 20px;
    display: flex;
    align-items: center;
    gap: 2px;
}

.dialog-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
}

.dialog-content {
    min-height: 200px;
    padding: 0 20px;
}

.content-row {
    display: flex;
    margin: 15px 0;
    align-items: baseline;
}

.label {
    width: 80px;
    color: #909399;
    font-size: 14px;
}

.value {
    flex: 1;
    color: #606266;
    font-size: 14px;
}

.time {
    color: #f56c6c;
    font-weight: 500;
}

.risk-description {
    line-height: 1.8;
    color: #606266;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 4px;
    margin-top: 15px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}
</style>
