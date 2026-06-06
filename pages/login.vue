<template>
  <div class="login-container">
    <div class="login-decoration">
      <div class="decoration-circle"></div>
      <div class="decoration-circle"></div>
    </div>
    
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2 class="system-title">企业税收风险管理系统</h2>
          <p class="company-name">ABC科技科技有限公司</p>
        </div>
      </template>

      <el-form 
        :model="form" 
        :rules="rules" 
        ref="loginForm"
        @submit.prevent="handleLogin"
        label-position="top"
      >
        <el-form-item label="工号" prop="userId">
          <el-input 
            v-model="form.userId" 
            placeholder="请输入工号"
            clearable
            size="large"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码"
            show-password
            size="large"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit"
            :loading="loading"
            class="login-button"
            size="large"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login-layout'
})

const { login } = useAuth()
const router = useRouter()
const loginForm = ref()
const loading = ref(false)

const form = reactive({
  userId: '',
  password: ''
})

const rules = {
  userId: [
    { required: true, message: '请输入工号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 模拟API调用延迟
      setTimeout(() => {
        login(form.userId, form.password)
        router.push('/statistical-analysis')
        loading.value = false
      }, 500)
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin-bottom: 8px;
  font-size: 24px;
  color: #303133;
}

.card-header p {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
</style>

