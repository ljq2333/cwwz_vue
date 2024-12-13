<template>
    <el-row :gutter="20">
        <el-col :span="6" :offset="0">狗狗百科</el-col>
        <el-col :span="4" :offset="12">
            <el-link type="success" href="#">
                更多
                <el-icon>
                    <DArrowRight />
                </el-icon>
            </el-link>
        </el-col>
    </el-row>
    <br>
    <div style="max-height: 450px;">
        <el-card class="card" v-for="(item, index) in new1" :key="index" style="height: 150px;">
            <el-row>
                <el-col :span="6" style="height: 110px;">
                    <!-- 图片位置 -->
                    <el-image style="height: 100%; width: 100%;object-fit: scale-down;" :src="item.img" fit="fill"
                        :lazy="true"></el-image>

                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-link type="primary" :underline="false" :href="openArticleLike(item.id)" target="_blank">
                            <div class="text-title">{{ item.title }}</div>

                        </el-link> <el-text truncated line-clamp="3" class="text-content"
                            style="word-wrap: break-word;">
                            {{ item.content }}
                        </el-text>
                        <div class="text-date"><el-icon>
                                <Timer />
                            </el-icon>{{ item.view_date }}</div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>


</template>

<script setup lang='ts'>


import { getAnimeNew1 } from '@/api/home';
import { getimage } from '@/api/image';
import { onMounted, ref } from 'vue'

const new1 = ref()

const getAnimen1 = async () => {
    const res = await getAnimeNew1('宠物狗')
    new1.value = res.data.data
    for (let i = 0; i < new1.value.length; i++) {
        new1.value[i].img = await getimage(new1.value[i].img)
    }
    // console.log(new1);

}

onMounted(() => {
    getAnimen1()
})

const openArticleLike = (id) => {

return '/article/'+id
}
</script>

<style>
.card {
    border: 1px solid #ccc;
}

.text-box {
    padding: 10px;
}

.text-title {
    font-size: 18px;
    font-weight: bold;
}

.text-content {
    font-size: 14px;
}

.text-date {
    font-size: 12px;
    color: #888;
}
</style>