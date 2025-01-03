import axios from "axios";

const {
  VITE_USER_API_URL,
  VITE_NEWS_API_URL,
  VITE_NOTICE_API_URL,
  VITE_HOME_API_URL,
  VITE_HOMEDETAIL_API_URL,
} = import.meta.env;

function createAxiosInstance(baseUrl, credentials) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: credentials
  });

  return instance;
}

function userAxios() {
  return createAxiosInstance(VITE_USER_API_URL, true);
}

function newsAxios() {
  return createAxiosInstance(VITE_NEWS_API_URL, true);
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

export { userAxios, newsAxios, noticeAxios, homeAxios, homeDetailAxios };
