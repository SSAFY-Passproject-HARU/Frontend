<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import RoomCard from "@/components/house/RoomCard.vue";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import { useUserStore } from "@/stores/user";

// 스토어 가져오기
const userStore = useUserStore();

// 상태 관리 변수
const rooms = ref([]); // 찜한 매물 데이터를 저장할 배열
const userId = ref(null);

// 찜한 매물 데이터 가져오기 함수
const fetchFavoriteRooms = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/room/favorites?userId=${userId.value}`);
    rooms.value = response.data; // 데이터 배열에 저장
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching favorite rooms:", error);
  }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  userId.value = userStore.user?.id; // 유저 ID 설정
  if (userId.value) {
    fetchFavoriteRooms();
  } else {
    console.warn("User ID is not available.");
  }
});
</script>

<template>
  <div class="home">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <div class="mypage-profile">
          <img class="mypage-image" src="@/assets/images/profile_img.JPEG" alt="profile_img" />
          <div class="mypage-content">
            <div class="mypage-info">
              <div class="mypage-info-top">
                <div class="mypage-nickname">자몽</div>
                <div class="mypage-role">일반 회원</div>
              </div>
              <div class="mypage-email">99yunsun@naver.com</div>
            </div>
            <router-link to="@/editProfile" class="mypage-edit-button">회원정보 수정</router-link>
          </div>
        </div>
        <div class="mypage-favorite">
          <h1>찜한 매물 리스트</h1>
          <div class="view">
            <div class="header">
              <span>내 매물 {{ rooms.length }}개</span>
              <button class="select-button" style="display: none">선택</button>
            </div>
            <div class="house-list">
              <RoomCard v-for="room in rooms" :key="room.roomId" :roomId="room.roomId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-family-primary);
  color: var(--primary);
}

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

.mypage-profile {
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  padding-left: 28px;
  gap: 68px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--primary);
}

.mypage-image {
  width: 240px;
  height: 240px;
  border-radius: 50%;
}

.mypage-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.mypage-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mypage-info-top {
  display: flex;
  align-items: center;
  gap: 24px;
}

.mypage-nickname {
  font-size: var(--font-size-header);
  font-weight: var(--font-weight-bold);
}

.mypage-role {
  font-size: var(--font-size-base);
}

.mypage-email {
  font-size: var(--font-size-title);
}

.mypage-edit-button {
  font-size: var(--font-size-large);
  text-decoration: underline;
}

h1 {
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-top: 40px;
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
