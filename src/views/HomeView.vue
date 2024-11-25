<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import HouseImageCard from "@/components/house/HouseImageCard.vue";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import { useUserStore } from "@/stores/user";

// 매물 리스트 데이터를 저장할 ref
const houseList = ref([]);
const userStore = useUserStore();

watchEffect(() => {
  if (userStore.user.sido && userStore.user.gugun && userStore.user.dong) {
    fetchHouseList();
  }
});

// 매물 데이터를 가져오는 함수
const fetchHouseList = async () => {
  try {
    if (userStore.user.sido && userStore.user.gugun && userStore.user.dong) {
      console.log("아ㅑ아아아아ㅏㅇ22222");
      const response = await axios.get("http://localhost:8080/room/detail", {
        params: {
          sido: userStore.user.sido,
          gugun: userStore.user.gugun,
          dong: userStore.user.dong
        },
      }); // API 경로 수정
      houseList.value = response.data; // 받은 데이터를 houseList에 저장
    }
  } catch (error) {
    console.error("매물 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 컴포넌트가 마운트될 때 데이터 호출
onMounted(() => {
  fetchHouseList();
});
</script>

<template>
  <div class="home">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <div class="top-menu">
          <h1 class="title">맞춤 추천 매물</h1>
        </div>
        <div class="house-list">
          <!-- houseList 배열을 순회하여 HouseImageCard 컴포넌트를 렌더링 -->
          <HouseImageCard v-for="house in houseList" :key="house.roomId" :house="house" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.main:after {
  content: "";
  position: absolute;
  left: 0px;
  right: 0px;
  height: 10%;
  bottom: 0px;
  background: linear-gradient(180deg, rgba(139, 167, 32, 0) 0%, rgba(255, 255, 255, 1) 100%);
  pointer-events: none;
}

.content {
  flex-grow: 1;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
}

.title {
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
}

button {
  border: none;
  background-color: transparent;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
}

.house-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
  
}
</style>
