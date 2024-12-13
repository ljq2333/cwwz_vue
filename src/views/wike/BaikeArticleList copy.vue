<template>
    BaikeArticleList
    <div class="infinite-list" v-infinite-scroll="load">
        <el-card  v-for="(item, index) in articles" :key="index" style="max-height: 250px;">
            <el-row>
                <el-col :span="6" style="max-height: 200px;">
                    <!-- 图片位置 -->
                    <el-image style="height: 100%; width: 100%;object-fit: scale-down;" :src="item.img" fit="fill"
                        :lazy="true"></el-image>
                </el-col>
                <el-col :span="18">
                    <div class="text-box">
                        <el-link type="primary" :underline="false" :href="openArticleLike(item.id)" target="_blank">
                            <div class="text-title">{{ item.title }}</div>
                        </el-link><br>
                        <el-text truncated line-clamp="3" class="text-content" style="word-wrap: break-word;">
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

<script setup>
import { getBaikeArticleList } from '@/api/baike';
import { getimage } from '@/api/image';
import { onMounted, ref } from 'vue';



const articles = ref([]);
let page = 1;
let num = 1;

const syncArticles = async () => {
    try {
        const res = await getBaikeArticleList(page, num); 
        // console.log(res);
        res.data.data.forEach(async (e) => {
        e.img =  getimage(e.img);
        articles.value.push(e);
    });
        

        // console.log('articles', articles.value);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};


const load = () => {
    page = page + 1;
    console.log('load',page);
    
    syncArticles();
}

onMounted(() => {
    syncArticles(page,num);
})

const openArticleLike = (id) => {

return '/article/' + id
}


</script>

<style scoped>

.infinite-list {
  height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>