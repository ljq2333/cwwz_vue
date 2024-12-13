<template>
  <div v-if="AnimeClass && AnimeClass.length > 0">
    <!-- <div>baikeList</div> -->
    <hr>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0" v-for="(item, index) in AnimeClass" :key="index">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0" class="anime-category">{{ item }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3" :offset="0" v-for="(Aitem, index2) in filteredAnimals(item)" :key="index2">
            <el-card class="box-card" shadow="hover" @click="openwike(Aitem.id)">
              <el-image class="card-image" fit="fill" :src="Aitem.imgPath" :alt="Aitem.全名"></el-image>
              <div class="overlay-text">{{ Aitem.全名 }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import { getAllAnimeList, getAnimeClass } from '@/api/home';
import { ref, onMounted } from 'vue';
import router from '@/router';
import { getimage } from '@/api/image';

// 假设这是你的动物数据
const animals = ref([]);
let AnimeClass = ref([]);

const syncAnimeClass = async () => {
  const response = await getAnimeClass();
  AnimeClass.value = response.data.data.slice(1);
  // console.log(AnimeClass.value);
}

const snycAnimeList = async () => {
  const res = await getAllAnimeList();
  animals.value = res.data.data;
  animals.value.forEach(element => {
    element.imgPath = getimage(element.imgPath)
  });
  console.log(animals.value);
}

const openwike = (id) => {
  router.push({ name: 'Baike', params: { id: id } });
}

const filteredAnimals = (category) => {
  // 如果 animals 尚未加载，返回空数组
  if (!animals.value) return [];
  return animals.value.filter((Aitem) => Aitem.分类 === category);
};

onMounted(() => {
  syncAnimeClass().then(() => snycAnimeList()); 
})
</script>

<style scoped>

.box-card {
    position: relative;
    /* background-color: rgba(0, 0, 0, 0); */
    border-radius: 50%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none; /* 移除边框 */
    max-width: 160px;
    --el-card-padding:10%;

}

.card-image {
    width: 100%;
    height: 100%; /* 确保图片高度也占满容器 */
    border: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 50%;
    object-fit: cover; /* 确保图片覆盖整个容器 */
}

.overlay-text {
    position: absolute;
    top: 66.66%; /* 位于图片三分之二处 */
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px;
}
.anime-category {
  font-size: 18px; /* 字体大小 */
  font-weight: bold; /* 加粗字体 */
  text-align: center; /* 居中文本 */
  padding: 10px; /* 内边距 */
  background: linear-gradient(45deg, #ff6a00, #ff9900); /* 渐变背景 */
  color: white; /* 字体颜色 */
  border-radius: 15px; /* 圆角效果 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  margin-bottom: 10px; /* 下边距 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

.anime-category:hover {
  background: linear-gradient(45deg, #ff9900, #ff6a00); /* 鼠标悬停时的背景颜色反转 */
  transform: translateY(-5px); /* 鼠标悬停时的提升效果 */
}

</style>