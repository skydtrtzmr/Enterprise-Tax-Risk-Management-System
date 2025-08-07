<template>
    <div class="welcome-container">
        <el-card class="welcome-card">
            <template #header>
                <div class="card-header">
                    <span>欢迎使用</span>
                </div>
            </template>
            <h1>企业税收风险管理系统</h1>
            <p>系统已准备就绪，请点击下方按钮进入风险测评中心。</p>
            <el-button type="primary" size="large" @click="goToRiskAssessment">
                进入风险测评
            </el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">


function goToRiskAssessment() {
    navigateTo("/risk-assessment");
}

</script>

<style scoped>
.welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.welcome-card {
    width: 100%;
    max-width: 500px;
    text-align: center;
}
.card-header {
    font-size: 20px;
    font-weight: bold;
}
p {
    color: #606266;
    margin: 20px 0;
}
</style>
