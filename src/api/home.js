import request from "@/util/http";

export const getAnimeClass = () => {
  return request({
    // url: "/home/AnimeClass/"
    url:'home/AnimeClass',
  });
};
export const getAnimeList = (cl) => {
  return request({
    url: `home/AnimeList/${cl}`
  });
};
export const getAllAnimeList = () => {
  return request({
    url: `home/AnimeList/`
  });
};
export const getHotAnimeList = () => {
  return request({
    url: 'home/hotArticles',
  });
};
export const getHotCarousel = () => {
  return request({
    url: 'home/hotCarousel',
  });
};

export const getClassFirst = (cl) => {
  return request({
    url: `home/getClassFirst/${cl}`
  });
};
export const getHotWikeArticle = (cl) => {
  return request({
    url: `home/getHotWikeArticle/${cl}`
  });
};
export const getAnimeNew1 = (cl) => {
  return request({
    url: `home/getAnimeNew1/${cl}`
  });
};
export const getAnimeImg = (num) => {
  return request({
    url: `home/getAnimeImgs/${num}`
  });
};