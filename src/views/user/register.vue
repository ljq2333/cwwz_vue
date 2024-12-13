<template>
    <el-container style="height: 100vh; display: flex; justify-content: center; align-items: center;">
        <el-card class="register-card" shadow="never" style="width: 400px; padding: 20px; border-radius: 12px;">
            <el-form :model="registerForm" status-icon >
                <el-form-item label="Username" prop="username">
                    <el-input v-model="registerForm.username" placeholder="Enter your username" clearable></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="registerForm.email" placeholder="Enter your email" clearable></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off"
                        placeholder="Enter your password" clearable></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="password_confirm">
                    <el-input type="password" v-model="registerForm.password_confirm" autocomplete="off"
                        placeholder="Confirm your password" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleRegister"
                        style="width: 100%; padding: 12px 0; border-radius: 20px; background: linear-gradient(45deg, #6e7fdf, #3b55e6);">
                        Submit
                    </el-button>
                    <el-button @click="resetForm"
                        style="width: 100%; margin-top: 10px; padding: 12px 0; border-radius: 20px; border: 1px solid #dcdfe6;">
                        Reset
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>

    <!-- 成功注册后弹出的对话框
    <el-dialog v-model="dialogVisible" :show-close="false" width="500">
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left">
                        <CircleCloseFilled />
                    </el-icon>
                    Close
                </el-button>
            </div>
        </template>
        This is dialog content.
    </el-dialog> -->
</template>

<script setup>
import { PostRegister } from '@/api/auth';
import { ref, nextTick, onMounted } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import router from '@/router';
console.log('register.vue');

// 表单模型
const registerForm = ref({
    username: '',
    email: '',
    password: '',
    password_confirm: ''
});

// 对话框显示控制
const dialogVisible = ref(false);

// 处理表单提交
const handleRegister = async () => {
    try {
        await nextTick();
        const response = await PostRegister(registerForm.value);
        const { code, msg, errors } = response.data;

        // 如果注册成功
        if (code === 200) {
            ElMessage.success(msg);  // 注册成功提示
            // dialogVisible.value = true;  // 显示对话框


            ElMessageBox.confirm(
                '注册成功，是否现在去登录?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }
            ).then(() => {
                // 用户点击确定后的操作，例如导航到首页或其他页面
                router.push('/login'); // 假设首页路径为 '/'
            }).catch(() => {
                // 用户点击取消后的操作（如果需要）
                ElMessage({
                    type: 'info',
                    message: '已取消跳转'
                });
            });


        } else if (code === 400) {
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
    }
};

// 重置表单
const resetForm = () => {
    registerForm.value = {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
    };
};

// 跳转到登录页面
const redirectToLogin = () => {
    router.push('/login');
};


const checkLogin = () => {
    // 检查是否已经登录
    const user_info = localStorage.getItem('user_info');
    if (user_info) {
        // 已经登录，跳转到首页
        router.push('/');
        ElMessage.warning('您已登录');
    }
};

onMounted(() => {
    // 初始化表单数据
    checkLogin();
});

</script>

<style scoped>
.register-card {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.el-form-item {
    margin-bottom: 20px;
}

.el-input {
    border-radius: 8px;
    padding: 10px;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
}
</style>
