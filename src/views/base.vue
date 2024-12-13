<template>
    <el-container>
        <el-header style="height: 100px;" class="heraderClass">
            <Header></Header>
            <!-- <Menu style="border-color:blue;"></Menu> -->
        </el-header>
        <el-main>
            <!-- <h2>Main</h2> -->
            <el-row class="border-box" :gutter="20">
                <el-col class="border-box" :span="24" :offset="0">
                    <!-- 菜单 -->
                    <Menu style="border-color:blue;"></Menu>
                </el-col>
                <el-col :span="24" :offset="0">
                    <!-- 内容 -->
                    <!-- <slot></slot> -->
                     <router-view></router-view>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-row :gutter="20">
                <el-col class="border-box" :span="24" :offset="0">
                    有情链接
                </el-col>
                <el-col class="border-box" :span="24" :offset="0">
                    低栏
                </el-col>
            </el-row>

        </el-footer>
    </el-container>
</template>

<script setup >
import { ref } from 'vue';
import Menu from '@/views/home/menu.vue';
import Header from '@/views/home/header.vue';
import Baike from '@/views/home/animeBaike.vue'
import AnimeWike from '@/views/home/animeWike.vue'
import AnimeCarousel from '@/views/home/animeCarousel.vue'
import Baike_wike from './home/baike_wike.vue';
import AnimeNew1 from '@/views/home/animeNew1.vue'
import AnimeNew2 from '@/views/home/animeNew2.vue'
import AnimeImg from '@/views/home/animeImg.vue';
import animeBaikeT from './home/animeBaikeT.vue';


const search = ref('');
// const logo = 'https://img.picui.cn/free/2024/10/14/670d0b9dd83e0.png';


</script>

<style>
.border-box {
    border: 1px solid black;
    padding: 10px;
    height: 100%;

}
</style>