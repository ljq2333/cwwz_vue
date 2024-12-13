import request from "@/util/http";
// auth.js
export const PostRegister = (data) => {
  return request({
    url: "auth/register",
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    data,
  });
};
export const PostLogin = (data) => {
  return request({
    url: "auth/login",
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    data,
  });
};

export const GetUserinfo = () => {
  return request({
    url: "/auth/get_user_info",
    method: "get",
  });
};
export const LoginOut = () => {
  return request({
    url: "/auth/LoginOut",
    method: "get",
  });
};