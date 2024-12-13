import request from "@/util/http";

export const getimage = (imgPath) => {
  let url = `${request.defaults.baseURL}/images/${imgPath}`
  return url;
};
