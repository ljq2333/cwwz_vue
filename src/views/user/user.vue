<template>
    <div class="profile-container">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
            <h1 style="text-align: center;">个人主页</h1>
            <div class="user-info">
                <el-descriptions title="" :column="1" border v-if="user">
                    <el-descriptions-item label="ID">
                        {{ user.id }}
                    </el-descriptions-item>
                    <el-descriptions-item label="电子邮件">
                        {{ user.email }}
                    </el-descriptions-item>
                    <el-descriptions-item label="用户名">
                        {{ user.username }}
                    </el-descriptions-item>
                    <el-descriptions-item label="注册时间">
                        {{ formatDate(user.register_time) }}
                    </el-descriptions-item>
                </el-descriptions>
                <p v-else>用户信息加载中...</p>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const user = ref(null);

const GetUserinfo = () => {
    try {
        const userInfo = localStorage.getItem('user_info');
        if (userInfo) {
            user.value = JSON.parse(userInfo);
            console.log(user.value);
        } else {
            console.warn('No user information found in localStorage.');
        }
    } catch (error) {
        console.error('Error parsing user information:', error);
    }
};

onMounted(() => {
    GetUserinfo();
});


const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，+1调整
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

</script>

<style scoped>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
}

.el-card {
    width: 400px;
}
</style>