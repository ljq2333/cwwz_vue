<template>
  <el-row :gutter="20" align="middle">
    <el-col :span="24" :offset="0">
      <el-tabs v-model="AcSel" type="border-card" tab-position="top" @tab-change="syncAnimes()">
        <el-tab-pane v-for="item in AnimeClass" :name="item" :label="item">
          <el-row :gutter="20">
            <el-col style="margin: 0 ;" :span="3" :offset="0" v-for="item in Animes">
              <el-card class="box-card" shadow="hover" @click="openwike(item.id)">
                <el-image class="card-image" fit='fill' :src=item.imgPath :alt=item.全名 srcset=""></el-image>
                <div class="overlay-text">
                  {{ item.全名 }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup >
import { onMounted, ref } from 'vue';
import axios from 'axios';
let AcSel = ref('热门宠物') // 初始选择的tab
const AnimeClass = ref()
const Animes = ref()
let filters = ref()
import animeBaikeS from './animeBaikeS.vue'
import { getAnimeClass, getAnimeList } from '@/api/home';
import { getimage } from '@/api/image';
import router from '@/router';

const syncAnimeClass = async () => {

  const response = await getAnimeClass()
  // console.log(response);

  AnimeClass.value = response.data.data

}
const syncAnimes = async () => {
  // 服务器获取数据
  // console.log('当前宠物类型',AcSel.value);

  const response = await getAnimeList(AcSel.value)
  Animes.value = response.data.data
  Animes.value.forEach(element => {
    element.imgPath = getimage(element.imgPath)
  });
  // console.log('获取宠物',AcSel,Animes.value);

}
onMounted(() => {
  syncAnimeClass()
  syncAnimes()
})

// 过滤出当前分类的内容

const openwike = (id) => {
  router.push({ name: 'Baike', params: { id: id } })
}
// const filterAnimes = (tabName) => {
//   console.log('当前选中的选项卡：', tabName);
//   if (tabName === '热门宠物') {
//     filters.value = Animes.value.slice(0, 16);
//   } else {
//     filters.value = Animes.value.filter(item => item['分类'] === tabName);
//   }
// };
</script>

<style scoped>
  /* * {
    margin: 0;
    padding: 0;
  } */


  .box-card {
    position: relative;
    /* background-color: rgba(0, 0, 0, 0); */
    border-radius: 50%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none; /* 移除边框 */
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
    max-width: 130px;
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

</style>