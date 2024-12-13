<template>
    <div class="article-page">
        <!-- 文章标题和发布日期 -->
        <el-card class="article-header">
            <h2>{{ article.title }}</h2>
            <p class="article-date">发布日期：{{ formattedDate() }}</p>
        </el-card>

        <!-- 文章内容 -->
        <el-card class="article-content">
            <div v-for="(item, index) in article.content" :key="index" class="content-item">
                <!-- 文本内容 -->
                <template v-if="item.type === 'text'">
                    <div v-html="item.content" class="text-content"></div>
                </template>
                <!-- 图片内容 -->
                <template v-else-if="item.type === 'img'">
                    <el-image :src="getImage(item.url)" class="image-content" fit="cover" lazy></el-image>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { getArticleId } from '@/api/baike';
import { getimage } from '@/api/image';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";

const article = ref({
    title: "",
    view_date: "",
    content: [],
});
const route = useRoute();
defineProps({
    id: String
});
const id = route.params.id;
console.log('id', id);

const syncArticle = async () => {
    const res = await getArticleId(id);
    if (res.data.code === 200) {
        console.log('res', res);
        article.value = {
            title: res.data.data.title || "",
            view_date: res.data.data.view_date || "",
            content: res.data.data.content || [],
        };
    }
    console.log('article', article.value);
}
onMounted(() => {
    syncArticle()
})
const formattedDate = () => {
    return article.value.view_date 
        ? new Date(article.value.view_date).toLocaleString() 
        : "日期未知";
};
const getImage = (url) => {
    return getimage(url);
};
</script>

<style scoped>
.article-page {
    padding: 20px;
    width: 80%; /* 限制页面内容宽度 */
    margin: 0 auto; /* 居中显示 */
    font-family: Arial, sans-serif; /* 使用清晰的字体 */
}

.article-header {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
}

.article-date {
    color: #999;
    font-size: 14px;
    margin-top: 10px;
}

.article-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
}

.content-item {
    margin-bottom: 30px; /* 增大间距 */
}

.text-content {
    font-size: 18px; /* 增大文字大小 */
    line-height: 1.8; /* 增加行高 */
    color: #333; /* 优化文字颜色 */
}

.image-content {
    width: 80%;
    max-height: 100%; /* 限制图片高度 */
    object-fit: cover; /* 裁剪图片适应容器 */
    border-radius: 8px; /* 增加圆角 */
    display: block;
    margin: 10px auto; /* 增加顶部间距 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); /* 增加图片阴影 */
}

@media (max-width: 768px) {
    .article-page {
        padding: 10px; /* 小屏幕减少内边距 */
    }

    .text-content {
        font-size: 16px; /* 调整文字大小 */
    }

    .image-content {
        max-height: 250px; /* 小屏幕减少图片高度 */
    }
}
</style>