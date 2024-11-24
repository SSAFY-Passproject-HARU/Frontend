<script setup>
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import NewsCard from "@/components/news/NewsCard.vue";
import { useNewsStore } from "@/stores/news";
import { onMounted, ref } from "vue";

const newsStore = useNewsStore();
const observerTarget = ref(null); // Intersection Observer 타겟

// Intersection Observer 설정
const createObserver = () => {
  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting && !newsStore.state.isLoading) {
        await newsStore.fetchNews();
      }
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
};

// 초기 데이터 로드 및 Observer 설정
onMounted(async () => {
  await newsStore.fetchNews();
  createObserver();
});
</script>

<template>
  <div class="news">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <div class="top-menu">
          <h1 class="title">‘{{ newsStore.state.query }}' 지역 뉴스</h1>
        </div>
        <div class="house-list">
          <NewsCard 
            v-for="(news, index) in newsStore.state.newsList"
            :key="index"
            :news="news"
          />
        </div>
        <!-- Intersection Observer 타겟 -->
        <div ref="observerTarget" class="observer-target"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news {
  width: 100%;
  display: flex;
}

main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.content {
  display: flex;
  flex-direction: column;
  padding: 36px;
  background-color: var(--secondary);
  border-radius: 10px 0 0 0;
  overflow: auto;
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}

.top-menu {
  width: calc(260px * 4 + 60px);
  margin-bottom: 36px;
}

.title {
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
}

.house-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
}

.observer-target {
  height: 1px; /* 화면 끝에 감지용 작은 영역 */
}

/* .page {
  width: 100%;
  height: 20px;
  margin-top: 10px;
} */
</style>
