<template>
  <div class="navbar">
    <router-link to="/" class="logo">HARU</router-link>
    <div class="nav-list">
      <div         
        class="nav-item"
        :class="{ active: route.path === '/notice' }"
      >
        공지사항
      </div>
      <hr />
      <div         
        class="nav-item"
        :class="{ active: route.path === '/' }"
      >
        맞춤 추천
      </div>
      <div         
        class="nav-item"
        :class="{ active: route.path === '/types' }"
      >
        종류별 추천
      </div>
      <div         
        class="nav-item"
        :class="{ active: route.path === '/map' }"
      >
        지도로 보기
      </div>
      <div         
        class="nav-item"
        :class="{ active: route.path === '/news' }"
      >
        관심 지역 뉴스
      </div>
      <div         
        class="nav-item"
        :class="{ active: route.path === '/favorites' }"
      >
        찜한 매물
      </div>
      <hr />
      <div class="nav-item">커뮤니티</div>
      <div class="nav-item">관심 지역 목록</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute(); // 현재 경로 정보를 가져옴
</script>

<style>
* {
  box-sizing: border-box;
}

.navbar {
  top: 0; /* 상단에 고정 */
  left: 0; /* 왼쪽에 고정 */
  width: 240px;
  height: 100vh;
  padding: 32px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;;
}

.logo {
  width: 100%;
  height: 30px;
  margin-bottom: 60px;
  color: var(--primary);
  font-family: var(--font-family-logo);
  font-size: var(--font-size-header);
  font-weight: var(--font-weight-bold);
}

.notice {
  width: 100%;
  height: 64px;
  background-color: var(--secondary);
  border: 1px solid var(--secondary-border);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
}

.nav-item.active {
  color: var(--primary); /* 활성화된 메뉴의 색상 */
  font-size: var(--font-size-base);
}

hr {
  height: 1px;
  background-color: var(--gray3);
  border-radius: 2px;
  border: 0;
  margin: 0;
}
</style>
