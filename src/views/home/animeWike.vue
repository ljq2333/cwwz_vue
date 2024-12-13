<template>
  <el-row :gutter="20">
    <!-- 上栏新闻 -->
    <el-col :span="24">
      <div v-for="(item, index) in list.slice(0, 5)" :key="index">
        <el-link
          type="default"
          :underline="false"
          :href="item.id"
          target="_blank"
          :class="{ 'highlight': index === 0 }"
        >
          {{ item.title }}
        </el-link>
      </div>
    </el-col>

    <!-- 下栏新闻 -->
    <el-col :span="24" style="margin-top: 20px;">
      <div v-for="(item, index) in list.slice(5, 10)" :key="index">
        <el-link
          type="default"
          :underline="false"
          :href="item.id"
          target="_blank"
          :class="{ 'highlight': index === 0 }"
        >
          {{ item.title }}
        </el-link>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { getHotAnimeList } from '@/api/home';
import { onMounted, ref } from 'vue'

const list = ref([])
 
const hotArticles = async()=>{
  const response = await getHotAnimeList()
  response.data.data.forEach(item=>{
    item.id = '/Article/'+item.id
  })
  list.value = response.data.data
  // console.log(list.value);
  
  
}
//   获取新闻列表
onMounted(()=>{
  hotArticles()
})
// onMounted是页面加载时执行


</script>

<style scoped>
.highlight {
  font-weight: bold;
  color: red;
}
.el-link {
  color: #333;
  font-size: 16px;
  padding: 5px 0;
  display: block;
  transition: all 0.3s ease;
  cursor: pointer;
}

.el-link:hover {
  color: #007BFF;
}

.highlight {
  font-weight: bold;
  color: #000;
}
</style>