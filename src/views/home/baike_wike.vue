<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(card, index) in cards" :key="index">
      <!-- 卡片组件 -->
      <el-card class="custom-card" shadow="hover">
        <!-- 上段：标题和访问链接 -->
        <el-row class="card-header" align="middle">
          <el-col :span="18">
            <span class="title">{{ card.分类 }}</span>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-link :href="String(card.id)" target="_blank">访问链接</el-link>
            <!-- 访问链接 -->
          </el-col>
        </el-row>

        <!-- 中段：图片展示 -->
        <div class="card-image">
          <el-image :src="card.imageUrl" fit="cover"></el-image>
        </div>

        <!-- 下段：条目 -->
        <div class="card-footer">
          <ul>
            <li v-for="(item, itemIndex) in card.Wikes">
              <el-link  :key="itemIndex" target="_blank" :href=openArticleLike(item.id)>{{
                item.title }}</el-link>
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { getAnimeClass, getClassFirst, getHotWikeArticle } from '@/api/home';
import { getimage } from '@/api/image';
import { el } from 'element-plus/es/locale';
import { onMounted, ref } from 'vue'

const AnimeClass = ref([])
const cards = ref([])

const syncAnimeClass = async () => {

  const response = await getAnimeClass()
  // console.log(response);

  AnimeClass.value = response.data.data
  // console.log(AnimeClass.value.length);
  synccards()


}

const synccards = async () => {
  for (let index = 1; index < AnimeClass.value.length - 1; index++) {
    const element = AnimeClass.value[index];
    // console.log('AnimeClass',element);

    const c1 = await getClassFirst(element)
    const w1 = await getHotWikeArticle(element)
    // console.log(w1.data.data);

    cards.value.push({
      全名: c1.data.data.全名,
      id: c1.data.data.id,
      imageUrl: await getimage(c1.data.data.imgPath),
      分类: c1.data.data.分类,
      Wikes: w1.data.data
    })
    

  }
}

const openArticleLike = (id) => {

    return '/article/'+id
}

onMounted(() => {
  syncAnimeClass()

})



</script>

<style scoped></style>