<script setup>
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import NewsCard from "@/components/news/NewsCard.vue";
import { useNewsStore } from "@/stores/news";
import { onMounted } from "vue";

const newsStore = useNewsStore();

// 초기 데이터 로드
onMounted(async () => {
  await newsStore.fetchNews();
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
        <!-- <div class="page">1 2 3 4 5</div> -->
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

/* .page {
  width: 100%;
  height: 20px;
  margin-top: 10px;
} */
</style>
