<template>
    <!-- BaikeArticleList -->
     
    <div class="infinite-list">
        <el-card v-for="(item, index) in articles" :key="index" style="max-height: 250px;margin-bottom: 10px;">
            <el-row>
                <el-col :span="6" style="max-height: 250px;">
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
        <div class="demo-pagination-block">
            <div class="demonstration" style="margin-top: 50px;"></div>
            <el-pagination v-model:current-page="page" :background="true" layout="prev, pager, next, jumper"
                :total="total" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { getArticleNum, getBaikeArticleList } from '@/api/baike';
import { getimage } from '@/api/image';
import { onMounted, ref } from 'vue';



const articles = ref([]);
let page = ref(1);
const total = ref(0);
let num = ref(10);

const syncArticles = async () => {
    try {
        const res = await getBaikeArticleList(page.value, num.value);
        const res1 = await getArticleNum();
        total.value = res1.data.data;
        // console.log(res);
        res.data.data.forEach(async (e) => {
            e.img = getimage(e.img);
        });
        articles.value = res.data.data;

        // console.log('articles', articles.value);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};

const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
    page.value = val;
    syncArticles();
}

onMounted(() => {
    syncArticles(page.value, num.value);
})

const openArticleLike = (id) => {

    return '/article/' + id
}


</script>

<style scoped>
.infinite-list {
    height: 370vh;
    padding: 0;
    margin: 10px 0 0 0;
    list-style: none;
}

</style>