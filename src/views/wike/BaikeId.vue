<template>
        <!-- <p class="page-title">显示 Baike 内容，ID: {{ id }}</p> -->
        <el-row :gutter="20" class="pet-page-wrapper" v-if="animal && animal.imgPath">
            <el-col :span="24" class="pet-avatar-info">
                <el-row class="pet-page">
                    <el-col :span="6" class="pet-avatar">
                        <img :src="animal.imgPath" alt="Pet Avatar" class="avatar-img" />
                    </el-col>
                    <el-col :span="18" class="pet-info">
                        <div class="pet-name">{{ animal.全名 }}</div>
                        <div class="pet-details">
                            <el-row>
                                <el-col :span="6"><strong>价格:</strong>{{ animal.价格 }} </el-col>
                                <el-col :span="6"><strong>体型:</strong>{{ animal.体型 }} </el-col>
                                <el-col :span="6"><strong>分类:</strong>{{ animal.分类 }} </el-col>
                                <el-col :span="6"><strong>别名:</strong>{{ animal.别名 }} </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6"><strong>功能:</strong>{{ animal.功能 }} </el-col>
                                <el-col :span="6"><strong>原产地:</strong> {{ animal.原产地 }}</el-col>
                                <el-col :span="6"><strong>寿命:</strong>{{ animal.寿命 }} </el-col>
                                <el-col :span="6"><strong>智商:</strong>{{ animal.智商 }} </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6"><strong>毛发:</strong>{{ animal.毛发 }} </el-col>
                                <el-col :span="6"><strong>饲养:</strong>{{ animal.饲养 }} </el-col>
                            </el-row>
                        </div>
                        <div class="pet-description">
                            <strong>简介:</strong>
                            <p>{{ animal.简介 }}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" class="additional-info">
                <p>Additional Info</p>
            </el-col>
        </el-row>
        <p v-else>Loading...</p> <!-- 显示加载中的信息 -->
    </template>
    
    <script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { getAnimalBaike } from "@/api/baike";
    import { getimage } from "@/api/image";
    
    // 获取当前路由参数中的id
    const route = useRoute();
    defineProps({
        id: String
        });
    const id = route.params.id;
    console.log("dongwu", id);
    
    const animal = ref(null);  // 设置初始值为 null
    
    const getAnimal = async (id: string) => {
        try {
            const response = await getAnimalBaike(id);
            animal.value = response.data.data;
            console.log(animal.value);
            if (animal.value && animal.value.imgPath) {
                animal.value.imgPath = getimage(animal.value.imgPath);
            }
        } catch (error) {
            console.error("Failed to fetch animal data:", error);
        }
    };
    
    onMounted(() => {
        getAnimal(id as string); 
    });
    </script>
    
    <style scoped>
    .page-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }
    
    .pet-page-wrapper {
        padding: 20px;
        background-color: #f9f9f9;
    }
    
    .pet-avatar-info {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .pet-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .avatar-img {
        width: 180px;
        height: 180px;
        border-radius: 10%;
        border: 2px solid #ddd;
        object-fit: cover;
    }
    
    .pet-info {
        padding-left: 20px;
    }
    
    .pet-name {
        font-size: 28px;
        font-weight: bold;
        color: #444;
        margin-bottom: 15px;
    }
    
    .pet-details {
        font-size: 14px;
        color: #555;
    }
    
    .pet-description {
        margin-top: 20px;
        color: #666;
    }
    
    .pet-details .el-row {
        margin-bottom: 10px;
    }
    
    .pet-details .el-col {
        padding-right: 10px;
    }
    
    .additional-info {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .pet-page-wrapper {
            padding: 10px;
        }
    
        .pet-avatar-info {
            padding: 10px;
        }
    
        .pet-avatar {
            justify-content: flex-start;
        }
    
        .pet-name {
            font-size: 22px;
        }
    
        .pet-details,
        .pet-description {
            font-size: 12px;
        }
    
        .avatar-img {
            width: 150px;
            height: 150px;
        }
    }
    </style>
    