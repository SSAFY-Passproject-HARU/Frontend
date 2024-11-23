import axios from "axios";

const {
  VITE_MEMBER_API_URL,
  VITE_NOTICE_API_URL,
  VITE_HOME_API_URL,
  VITE_HOMEDETAIL_API_URL,
} = import.meta.env;

function createAxiosInstance(baseUrl, credientials) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: credientials
  });

  return instance;
}

function memberAxios() {
  return createAxiosInstance(VITE_MEMBER_API_URL, true);
}

function noticeAxios() {
  return createAxiosInstance(VITE_NOTICE_API_URL, true);
}

function homeAxios() {
  return createAxiosInstance(VITE_HOME_API_URL, true);
}

function homeDetailAxios() {
  return createAxiosInstance(VITE_HOMEDETAIL_API_URL, true);
}

export { memberAxios, noticeAxios, homeAxios, homeDetailAxios };
