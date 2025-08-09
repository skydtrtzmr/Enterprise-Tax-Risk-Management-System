import { useState } from '#imports'

export const useAuth = () => {
  const authUser = useState('authUser', () => ({
    isLoggedIn: false,
    userId: '',
    department: ''
  }))

  const login = (userId: string, password: string) => {
    // 假登录逻辑，实际项目中应该调用API
    authUser.value = {
      isLoggedIn: true,
      userId,
      department: '税务管理' // 固定部门，根据需求可修改
    }
  }

  const logout = () => {
    authUser.value = {
      isLoggedIn: false,
      userId: '',
      department: ''
    }
  }

  return {
    authUser,
    login,
    logout
  }
}
