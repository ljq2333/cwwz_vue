import router from '@/router';
// import { useuserStore } from '@/stores/user';
import axios from 'axios';
import { ElMessage } from 'element-plus';



const request = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 5000,
  withCredentials: true, // 发送cookie
  // headers: {
  //   'Content-Type': 'application/json', // 设置类型
  // },
});

// 请求拦截器接口请求带token值
// request.interceptors.request.use(
//   (config) => {
//     const userStore = useuserStore();
//     if (userStore.token) {
//       config.headers.Token = userStore.token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 如果响应是 Blob 类型，直接返回
    if (response.config.responseType === 'blob') {
      return response;
    }
    if (response.data.code === 200&&response.data.status !== 1) {
      return response;
    }
    ElMessage.error(response.data.msg || '服务异常');
    return Promise.reject(response.data);
  },
  (error) => {
    console.error(error);
    const message = error.response?.data?.message || '服务异常';
    ElMessage({
      message,
      type: 'error'
    });

    if (error.response?.status === 401) {
      const userStore = useuserStore();
      userStore.removeToken();
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default request;