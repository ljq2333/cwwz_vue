<template>
    <el-card class="box-card" shadow="hover" @click="openwike(animal.id)">
        <el-image class="card-image" fit='fill' :src=animal.imgPath :alt=item.全名 srcset=""></el-image>
        <div class="overlay-text" v-show="showFirstTextBox">
            {{ animal.全名 }}
        </div>
    </el-card>
</template>

<script setup>
import router from '@/router';

let showFirstTextBox = true;
let showSecondTextBox = false;

const props = defineProps({
    item: Object
})
const animal = props.item
console.log(animal);

const openwike = (id) => {
    router.push({ name: 'Baike', params: { id: id } })
}
</script>

<style scoped>
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */
/* .el-card {
    --el-card-padding:10%;
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