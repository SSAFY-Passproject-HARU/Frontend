import { reactive, watchEffect } from "vue";
import { defineStore } from "pinia";
import { newsAxios } from "@/utils/http-commons";
import { useUserStore } from "./user";

export const useNewsStore = defineStore("news", () => {
  const userStore = useUserStore();
  const newsHttp = newsAxios();

  const state = reactive({
    newsList: [], // 뉴스 데이터를 저장
    isLoading: false,
    query: `${userStore.user.sido} ${userStore.user.gugun} ${userStore.user.dong}`,
    size: 20,
    currentPage: 0,
  });

  watchEffect(() => {
    if (userStore.user.sido && userStore.user.gugun && userStore.user.dong) {
      state.query = `${userStore.user.sido} ${userStore.user.gugun} ${userStore.user.dong}`;
      fetchNews();
    }
  });

  // 뉴스 데이터 가져오기
  async function fetchNews() {
    if (state.isLoading) return; // 중복 요청 방지
    state.isLoading = true;
    try {
      console.log("query: " + state.query);
      const res = await newsHttp.get("", {
        params: {
          query: state.query,
          size: state.size,
          page: state.currentPage,
        },
      });
      state.newsList.push(...res.data.items); // 새 데이터를 기존 뉴스들에 추가
      state.currentPage++; // 다음 페이지로 이동
    } catch (err) {
      console.error("뉴스 데이터를 가져오는 중 오류 발생:", err);
    } finally {
      state.isLoading = false;
    }
  }

  // 검색어 변경 및 초기화 (관심 지역을 변경할 때 사용할 예정)
  function updateQuery() {
    state.query = `${userStore.user.sido} ${userStore.user.gugun} ${userStore.user.dong}`;
    state.newsList = []; // 기존 데이터 초기화
    state.currentPage = 0;
    fetchNews(); // 새로운 검색어로 데이터 가져오기
  }

  // 상태 초기화 (관심 지역을 설정하지 않을 때 사용할 예정)
  function resetState() {
    state.newsList = [];
    state.currentPage = 0;
    state.isLoading = false;
  }

  return {
    state,
    fetchNews,
    updateQuery,
    resetState,
  };
});
