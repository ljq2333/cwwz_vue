<template>
    login.vue
    <div class="login-form-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户登录</span>
        </div>
      </template>
      <el-form :model="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="登录邮箱">
          <el-input v-model="form.email" placeholder="请输入您的邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input type="password" v-model="form.password" placeholder="请输入您的密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
          <el-button @click="resetForm()">重新输入</el-button>
          <el-button @click="router.push('/register')">去注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
    
    
</template>

<script setup>
import { GetUserinfo, PostLogin } from '@/api/auth';
import { ref, nextTick, onMounted } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import router from '@/router';

const loading = ref(false);

console.log('login.vue');
const form = ref({
    email : '',
    password : ''
});

const handleLogin = async () => {
    loading.value = true;
    try {
        await nextTick();
        const response = await PostLogin(form.value);
        const { code, msg, errors } = response.data;

        // 如果登录成功
        if (code === 200) {
            ElMessage.success(msg);  // 成功提示
            // dialogVisible.value = true;  // 显示对话框

            // 讲用户信息存入localStorage
            const user_info = await GetUserinfo()
            localStorage.setItem('user_info', JSON.stringify(user_info.data.data));


            ElMessageBox.confirm(
                '登录成功，是否现在去首页?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }
            ).then(() => {
                // 用户点击确定后的操作，例如导航到首页或其他页面
                // router.push('/'); // 假设首页路径为 '/'
                window.location.href = '/';
            }).catch(() => {
                // 用户点击取消后的操作（如果需要）
                ElMessage({
                    type: 'info',
                    message: '已取消跳转'
                });
            });

        } else{
            // 如果是400错误，显示后端返回的具体错误信息
            if (errors) {
                for (const [field, errorMsg] of Object.entries(errors)) {
                    ElMessage.error(`${field}: ${errorMsg}`);  // 显示字段名和错误信息
                }
            } else {
                ElMessage.error(msg || 'Registration failed');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data) {
            const { code, errors } = error.response.data;
            if (code === 400 && errors) {
                for (const [field, errorMsg] of Object.entries(errors)) {
                    ElMessage.error(`${field}: ${errorMsg}`);
                }
            } else {
                ElMessage.error('An error occurred during registration.');
            }
        } else {
            ElMessage.error('Server error. Please try again later.');
        }
    }finally{
        loading.value = false;
    }
};


const resetForm = () => {
    form.value.email = '';
    form.value.password = '';
};

const checkLogin = () => {
    // 检查是否已经登录
    const user_info = localStorage.getItem('user_info');
    if (user_info) {
        // 已经登录，跳转到首页
        ElMessage.warning('您已登录');
        router.push('/');
    }
};

onMounted(() => {
    // 初始化表单数据
    checkLogin();
});

</script>

<style scoped>

.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.box-card {
  width: 400px;
}

.card-header {
  text-align: center;
}

.demo-ruleForm {
  padding: 0 20px;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>