<template>
  <Base>
    <!-- <router-view></router-view> -->
     <!-- <slot></slot> -->
  </Base>
</template>

<script setup lang='ts'>
import router  from '@/router';
import { ref } from 'vue';
import Base from '@/views/base.vue'
</script>

<style>
.border-box {
  border: 1px solid black;
  padding: 10px;
  height: 100%;

}
</style>