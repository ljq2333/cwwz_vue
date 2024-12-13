<template>
  <!-- <h2>menu</h2> -->
  <el-menu mode="horizontal" default-active="1" @select="handleSelect">

    <el-menu-item index="1">
      <el-icon>
        <House />
      </el-icon>
      首页
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Notebook />
        </el-icon>
        宠物知识
      </template>
      <el-menu-item index="2">宠物百科</el-menu-item>
      <el-menu-item index="3">宠物知识</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <ChatLineSquare />
      </el-icon>
      宠物交流区
    </el-menu-item>
    <el-sub-menu index="5" v-if="haslocalStorage">
      <template #title>
        <el-icon>
          <UserFilled />
        </el-icon>
        {{storedUser.username}}
      </template>
      <el-menu-item index="5" v-if="haslocalStorage">
        <el-icon>
          <UserFilled />
        </el-icon>
        个人中心
      </el-menu-item>
      <el-menu-item index="8">退出登录</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="6" v-if="!haslocalStorage">
      <el-icon>
        <UserFilled />
      </el-icon>
      注册
    </el-menu-item>
    <el-menu-item index="7" v-if="!haslocalStorage">
      <el-icon>
        <UserFilled />
      </el-icon>
      登录
    </el-menu-item>
  </el-menu>
</template>

<script setup lang='ts'>
import router from "@/router";
import { ElMessageBox,ElMessage } from "element-plus";
import { onMounted } from "vue";
import { LoginOut } from "@/api/auth";

const haslocalStorage = localStorage.getItem('user_info') !== null
console.log('haslocalStorage', haslocalStorage);
const storedUser = JSON.parse(localStorage.getItem('user_info'));

const handleSelect = (index: string) => {
  // console.log(index);
  switch (index) {
    case "1":
      router.push("/home");
      break;
    case "2":
      router.push({ name: 'BaikeList' });
      break;
    case "3":
      router.push({ name: 'BaikeArticleList' });
      break;
    case "4":
      router.push("/community");
      break;
    case "5":
      router.push({ name: 'User' });
      break;
    case "6":
      router.push({ name: 'Register' });
      break;
    case "7":
      router.push({ name: 'Login' });
      break;
    case "8":
      loginOut();
      break;
  }

};
const loginOut = () => {
  ElMessageBox.confirm(
    '是否要退出登录状态',
    '退出登录',
    {
      confirmButtonText: '退出登录',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      localStorage.removeItem('user_info');
      LoginOut()
        .then(response => {
          // 3. 请求成功，给用户提示
          ElMessage({
            type: 'success',
            message: '退出登录状态成功',
          });

          // 你可以选择跳转到登录页面
          // router.push('/login');
          window.location.href = '/';
        })
      ElMessage({
        type: 'success',
        message: '退出登录状态成功',
      })
    })
    .catch(() => {
      
    })
}


onMounted(() => {

});

</script>

<style></style>