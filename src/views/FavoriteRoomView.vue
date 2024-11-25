<template>
  <div class="page">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <h1>찜한 매물 리스트</h1>
        <div class="view">
          <div class="header">
            <span>내 매물 {{ rooms.length }}개</span>
            <button class="select-button" style="display: none;">선택</button>
          </div>
          <div class="house-list">
            <HouseImageCard 
              v-for="room in rooms" 
              :key="room.roomId" 
              :roomId="room.roomId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import HouseImageCard from "@/components/house/HouseImageCard.vue";
export default {
  name: "FavoriteRoomView",
  components: { NavBar, TopBar, HouseImageCard },
  data() {
    return {
      rooms: [], // 찜한 매물 데이터를 저장할 배열
    };
  },
  methods: {
    async fetchFavoriteRooms() {
      try {
        // userId를 기준으로 서버에서 찜한 매물 데이터 가져오기
        const response = await axios.get(`http://localhost:8080/room/favorites?userId=user`);
        this.rooms = response.data; // 데이터 배열에 저장
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching favorite rooms:", error);
      }
    },
  },
  mounted() {
    this.fetchFavoriteRooms(); // 컴포넌트가 마운트될 때 데이터 요청
  },
}
</script>

<style scoped>
.page {
  width: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.content {
  flex-grow: 1;
  padding: 36px;
  background-color: var(--secondary);
  border-radius: 10px 0 0 0;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}

.content::-webkit-scrollbar {
  display: none;
}

.view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

* {
  font-family: var(--font-family-primary);
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 36px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header span {
  font-size: 18px;
  font-weight: var(--font-weight-bold);
}

.select-button {
  background-color: var(--primary);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 부드러운 전환 효과 */
}

.select-button:hover {
  background-color: var(--primary-dark);
}

.select-button:active {
  background-color: rgba(0, 0, 0, 0.1); /* 살짝 연하게 만들어주는 효과 */
}

.house-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 36px 20px;
}
</style>
