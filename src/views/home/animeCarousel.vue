<template>
    <!-- <div class="block text-center" m="t-4"> -->
    <!-- <span class="demonstration">轮播图</span> -->
    <el-carousel trigger="click" :interval="intervalTime" :motion-blur="true" indicator-position="outside">
        <el-carousel-item @click="openArticle(item.id)" style="height: 100%;" v-for="item in list" :key="item">
            <h3  class="small justify-center" text="">{{ item.title }}</h3>
            <el-image class="Carousel-image" :src="item.img" fit="fill" :alt="item.title"></el-image>
        </el-carousel-item>
    </el-carousel>
    <!-- </div> -->
</template>

<script setup lang='ts'>
import { getHotCarousel } from '@/api/home';
import { getimage } from '@/api/image';
import { ElLink } from 'element-plus';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { onMounted, ref } from 'vue';

const intervalTime = 15000
// 自动切换时间间隔
const list = ref()
const SynchotCarousel = async () => {
    const response = await getHotCarousel()
    list.value = response.data.data
    list.value.forEach((item: { img: string; }) => {
        item.img = getimage(item.img)
    });
    // console.log(list.value);

}
const openArticle = (id) => {
    window.location.href='/article/'+id
}
onMounted(() => {
    SynchotCarousel()
}

)

</script>

<style>
.Carousel-image {
    width: 100%;
    height: 100%;
    /* 确保图片高度也占满容器 */
    border: none;
    object-fit: cover;
    /* 确保图片覆盖整个容器 */
}
</style>