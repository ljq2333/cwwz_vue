<template>
    <!-- <div style="background-image: url(https://img.picui.cn/free/2024/10/17/6710fda9cc084.png);"> -->
        <el-row align="middle">
                <el-col :span="3" :offset="0" @click="$router.push('/home')">
                    <el-image :src="logo" fit="cover" :lazy="true" style="width: 100px;height: 100px;"></el-image>
                </el-col>
                <el-col :span="6" :offset="0">
                    <span style="font-size: 30px; ">宠物护理与交流</span>
                </el-col>
                <el-col :span="7" :offset="0"></el-col>

                <el-col :span="2" :offset="0">
                    <el-button type="primary" size="default" @click="$router.push('/home')" style="">
                        <el-icon>
                            <Iphone />
                        </el-icon>
                    </el-button>
                </el-col>
                <el-col :span="6" :offset="0">
                    <el-input v-model="search" placeholder="搜索" size="" clearable @change=""></el-input>
                </el-col>
            </el-row>
    <!-- </div> -->
</template>

<script setup >
import { ref } from 'vue';

const search = ref('');
// const logo = 'https://img.picui.cn/free/2024/10/14/670d0b9dd83e0.png';
import logo from "@/views/img/logo.png";
// const logo = ref('../img/logo.png')

</script>

<style>
.upCenter {
    display: flex;
    align-items: center;
}
</style>