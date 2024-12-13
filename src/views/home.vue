<template>
    <el-row :gutter="20">
        <el-col class="border-box" :span="24" :offset="0">
            <!-- 宠物百科 -->
            <Baike></Baike>
        </el-col>
        <el-col :span="24" :offset="0">
            <el-row :gutter="20">
                <el-col class="border-box" :span="6" :offset="0">
                    <!-- 宠物知识列表 -->
                    <AnimeWike></AnimeWike>
                </el-col>
                <el-col class="border-box" :span="18" :offset="0">
                    <!-- 宠物知识大模块 -->
                    <AnimeCarousel></AnimeCarousel>
                </el-col>
            </el-row>
        </el-col>
        <el-col class="border-box" :span="24" :offset="0">
            <!-- 宠物百科+宠物知识 -->
            <Baike_wike></Baike_wike>
        </el-col>
        <el-col class="border-box" :span="12" :offset="0">
            <!-- 宠物知识（注意事项） -->
            <AnimeNew1></AnimeNew1>
        </el-col>
        <el-col class="border-box" :span="12" :offset="0">
            <!-- 宠物推荐 -->
            <AnimeNew2></AnimeNew2>
        </el-col>
        <el-col class="border-box" :span="24" :offset="0">
            <!-- 宠物图片(跳转到相应的宠物知识) -->
            <AnimeImg></AnimeImg>
        </el-col>
        <el-col class="border-box" :span="24" :offset="0">
            <!-- 宠物百科（筛选只有文字） -->
            <animeBaikeT></animeBaikeT>
        </el-col>

    </el-row>

</template>

<script setup lang='ts'>
import { ref } from 'vue';
import Baike from '@/views/home/animeBaike.vue'
import AnimeWike from '@/views/home/animeWike.vue'
import AnimeCarousel from '@/views/home/animeCarousel.vue'
import Baike_wike from './home/baike_wike.vue';
import AnimeNew1 from '@/views/home/animeNew1.vue'
import AnimeNew2 from '@/views/home/animeNew2.vue'
import AnimeImg from '@/views/home/animeImg.vue';
import animeBaikeT from './home/animeBaikeT.vue';


</script>

<style>
.border-box {
    border: 1px solid black;
    padding: 10px;
    height: 100%;

}
</style>