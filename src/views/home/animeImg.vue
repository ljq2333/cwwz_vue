<template>
    <el-row :gutter="10" style="max-height: 500px;">
        <el-col :span="8">
            <div class="imgshow"  @mouseenter="setHovered(0, true)" @mouseleave="setHovered(0, false)" tabindex="0">
                <el-image :src="AnimeImgs[0].img" fit="fill" :lazy="true" style="width: 100%; height: 400px;"></el-image>
                <div @click="openArticleLike(AnimeImgs[0].id)" v-if="hovered[0]" class="hover-text">
                    {{ AnimeImgs[0].title }}
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <el-row :gutter="5">
                <el-col :span="12">
                    <div class="imgshow"  @mouseenter="setHovered(1, true)" @mouseleave="setHovered(1, false)" tabindex="0">
                        <el-image :src="AnimeImgs[1].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[1].id)"  v-if="hovered[1]" class="hover-text">
                            {{ AnimeImgs[1].title }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="imgshow"  @mouseenter="setHovered(2, true)" @mouseleave="setHovered(2, false)" tabindex="0">
                        <el-image :src="AnimeImgs[2].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[2].id)" v-if="hovered[2]" class="hover-text">
                            {{ AnimeImgs[2].title }}
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="imgshow"  @mouseenter="setHovered(3, true)" @mouseleave="setHovered(3, false)" tabindex="0">
                        <el-image :src="AnimeImgs[3].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[3].id)" v-if="hovered[3]" class="hover-text">
                            {{ AnimeImgs[3].title }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="8">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="imgshow"  @mouseenter="setHovered(4, true)" @mouseleave="setHovered(4, false)" tabindex="0">
                        <el-image :src="AnimeImgs[4].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[4].id)" v-if="hovered[4]" class="hover-text">
                            {{ AnimeImgs[4].title }}
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="5">
                <el-col :span="12">
                    <div class="imgshow"  @mouseenter="setHovered(5, true)" @mouseleave="setHovered(5, false)" tabindex="0">
                        <el-image :src="AnimeImgs[5].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[5].id)" v-if="hovered[5]" class="hover-text">
                            {{ AnimeImgs[5].title }}
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="imgshow"  @mouseenter="setHovered(6, true)" @mouseleave="setHovered(6, false)" tabindex="0">
                        <el-image :src="AnimeImgs[6].img" fit="fill" :lazy="true" style="width: 100%; height: 200px;"></el-image>
                        <div @click="openArticleLike(AnimeImgs[6].id)" v-if="hovered[6]" class="hover-text">
                            {{ AnimeImgs[6].title }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { getAnimeImg } from '@/api/home';
import { getimage } from '@/api/image';
import { onMounted, ref } from 'vue';

// 用一个数组来管理每个卡片的悬停状态
const hovered = ref([false, false, false, false, false, false, false]);

const AnimeImgs = ref(
    [
    { id: 1, title: '照片1', img: '#' },
    { id: 2, title: '照片2', img: '#' },
    { id: 3, title: '照片3', img: '#' },
    { id: 4, title: '照片4', img: '#' },
    { id: 5, title: '照片5', img: '#' },
    { id: 6, title: '照片6', img: '#' },
    { id: 7, title: '照片7', img: '#' },
]
);

const AnimeImg = async()=>{
    const res = await getAnimeImg('7');
    AnimeImgs.value=res.data.data;
    
    
    for (let index = 0; index < AnimeImgs.value.length; index++) {
        AnimeImgs.value[index].img = await getimage(AnimeImgs.value[index].img)
        
    }
    // console.log('AnimeImgs',AnimeImgs.value);
    
}

onMounted(()=>{
 
    AnimeImg();
})
// 设置悬停状态的函数
const setHovered = (index: number, value: boolean) => {
    hovered.value[index] = value;
};

const openArticleLike = (id) => {
    window.location.href='/article/'+id
}

</script>

<style>
.imgshow {
    position: relative;
    /* height: 200px; */
}
.image {
    height: 100%;
    width: 100%;
}

.hover-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
}

.image-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.titleImg {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 4px;
}
</style>
