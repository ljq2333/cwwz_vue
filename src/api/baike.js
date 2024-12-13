import request from "@/util/http";

export const getAnimalBaike = (id) => {
  return request({
    url: `baike/${id}`
  });
};
export const getBaikeArticleList = (page,num) => {
  return request({
    url: `baike/BaikeArticleList/${page}/${num}`
  });
};
export const getArticleNum = () => {
  return request({
    url: `baike/getArticleNum`
  });
};

export const getArticleId = (id) => {
  return request({
    url: `baike/Article/${id}`
  });
};
