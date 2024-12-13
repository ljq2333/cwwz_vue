<template>
    <el-row :gutter="20">
        <el-col class="baikeT" v-for="(item, index) in animals" :key="index" :span="2" :offset="0" style="">
            <el-button style="width: 100%;" text bg>
                <el-link type="default" :underline="false" :href="openArticleLike(item.id)" target="_blank">
                    {{ item.全名 }}
                </el-link>

            </el-button>
        </el-col>
    </el-row>

</template>

<script setup lang='ts'>
import { getAllAnimeList, getAnimeList } from '@/api/home';
import { onMounted, ref } from 'vue';

const animals = ref()

const getAnimels = async () => {
    const res = await getAllAnimeList();
    animals.value = res.data.data
    // console.log(animals.value);

}
onMounted(() => {
    getAnimels()
})

const openArticleLike = (id) => {

    return '/Baike/' + id
}


</script>

<style>
.baikeT {
    padding: 5px;
    min-width: 140px;
}
</style>