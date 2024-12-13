// src/store/index.js
import { defineStore } from 'pinia';
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://127.0.0.1:5000', // 设置基础URL
  withCredentials: true, // 发送cookie
});

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    async fetchUserInfo() {
      try {
        const response = await request.get("/auth/get_user_info");
        if (response.data.code === 200) {
          this.userInfo = response.data.data;
        } else {
          console.error('获取用户信息失败:', response.data.msg);
        }
      } catch (error) {
        console.error('请求用户信息时出错:', error);
      }
    },
  },
});