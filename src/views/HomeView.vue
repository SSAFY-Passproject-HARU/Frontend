<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import { useUserStore } from "@/stores/user";
import HomeRoomCard from "@/components/house/HomeRoomCard.vue";

// 매물 리스트 데이터를 저장할 ref
const userStore = useUserStore();
const rooms = ref([]);
const favoriteRooms = ref([]);

// 찜한 매물 데이터 가져오기 함수
const fetchFavoriteRooms = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/room/favorites?userId=${userStore.user.id}`
    );
    favoriteRooms.value = response.data; // 데이터 배열에 저장
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching favorite rooms:", error);
  }
};

// 유저 선호 매물을 가져오는 함수
const fetchRecommendationList = async () => {
  try {
    if (userStore.user.id) {
      console.log("추천 매물 데이터를 가져오는 중...");
      const response = await axios.get(
        `http://localhost:8080/room/recommendation/${userStore.user.id}`
      );
      rooms.value = response.data;
    }
  } catch (error) {
    console.error("추천 매물 데이터를 가져오는 데 실패했습니다:", error);
  }
};

// 찜한 매물 여부를 확인하는 함수
const isRoomFavorited = (roomId) => {
  if (roomId == 4) {
    console.log(favoriteRooms.value.some((favoriteRoom) => favoriteRoom.roomId === roomId));
  }
  return favoriteRooms.value.some((favoriteRoom) => favoriteRoom.roomId === roomId);
};

watchEffect(async () => {
  if (userStore.user.sido && userStore.user.gugun && userStore.user.dong && userStore.user.id) {
    await fetchFavoriteRooms();
    fetchRecommendationList();
  }
});

// 컴포넌트가 마운트될 때 데이터 호출
onMounted(async () => {
  await fetchFavoriteRooms();
  fetchRecommendationList();
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
        <div class="rooms">
          <!-- rooms 배열을 순회하여 HomeRoomCard 컴포넌트를 렌더링 -->
          <HomeRoomCard
            v-for="room in rooms"
            :key="room.roomId"
            :roomId="room.roomId"
            :like="isRoomFavorited(room.roomId)"
          />
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

.rooms {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
}
</style>
