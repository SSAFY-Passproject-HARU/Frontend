<script setup>
import { ref, defineProps, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // router 추가
const router = useRouter(); // router 객체 생성

// props로 받은 매물 정보
const props = defineProps({
  roomId: {
    type: Number,
    required: true,
  },
});

// hover 상태 관리
const isHovered = ref(false);

// overlay에 표시할 정보를 객체로 관리
const overlayInfo = ref({
  aptNm: "",
  price: "",
  area: "",
  roomCount: "",
  bathroomCount: "",
  roomType: "",
  roomFloor: "",
  totalFloors: "",
});

// 이미지 URL을 담을 변수
const roomImage = ref("");

// 아파트 정보 가져오기
const getAptInfo = async () => {
  try {
    // roomId에 맞는 아파트 이름과 상세 정보 가져오기
    const responseAptName = await axios.get(
      `http://localhost:8080/room/detail/${props.roomId}/apt-name`
    );
    const responseRoomDetail = await axios.get(`http://localhost:8080/room/detail/${props.roomId}`);
    const responseRoomImages = await axios.get(`http://localhost:8080/room/images/${props.roomId}`);

    // 첫 번째 이미지 URL을 roomImage에 저장
    if (responseRoomImages.data && responseRoomImages.data.length > 0) {
      roomImage.value = "/images/" + responseRoomImages.data[0].imageUrl; // 이미지 URL을 적절한 형식으로 설정
    }

    // 받은 데이터를 overlayInfo에 저장
    overlayInfo.value = {
      aptNm: responseAptName.data,
      price: responseRoomDetail.data.price,
      area: responseRoomDetail.data.area,
      roomCount: responseRoomDetail.data.roomCount,
      bathroomCount: responseRoomDetail.data.bathroomCount,
      roomType: responseRoomDetail.data.roomType,
      roomFloor: responseRoomDetail.data.roomFloor,
      totalFloors: responseRoomDetail.data.totalFloors,
    };
  } catch (error) {
    console.error("Error fetching apartment name or detail:", error);
  }
};

// 클릭 시 상세 페이지로 이동
const goToDetailPage = () => {
  router.push(`/room/detail/${props.roomId}`);
};

// favorite 아이콘 클릭 시 실행될 함수
const handleFavoriteClick = async() => {
  console.log("Favorite icon clicked!");
  try {
    const userStore = useUserStore();            
    const likeData = {
                    userId: userStore.user.id, // 로그인된 사용자 ID (현재 하드코딩 상태)
                    roomId: props.roomId
                };
                await axios.delete('http://localhost:8080/room/removelike', { data: likeData });
                alert('관심 목록에서 제거되었습니다!');
                window.location.reload();
            } catch (error) {
                console.error('Error removing favorite:', error);
                alert('관심 목록에서 제거에 실패했습니다.');
            }
};

// 컴포넌트가 마운트될 때 아파트 정보 가져오기
onMounted(() => {
  getAptInfo();
});
</script>

<template>
  <div
    class="card"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="goToDetailPage"
  >
    <div class="card-image">
      <!-- 이미지가 존재하는 경우, 받아온 첫 번째 이미지를 표시 -->
      <img
        v-if="roomImage"
        :src="roomImage"
        alt="House Image"
        class="house-image"
      />
      <img 
        src="@/assets/images/icons/icon-star-yellow.png" 
        alt="favorite" 
        class="favorite" 
        @click.stop="handleFavoriteClick" 
      />
      <!-- hover 시 overlay 표시 -->
      <div class="overlay" v-if="isHovered">
        <p class="overlay-aptNm">{{ overlayInfo.aptNm }}</p>
        <p class="overlay-detail">{{ overlayInfo.roomType }}</p>
        <p class="overlay-detail">
          {{ overlayInfo.area }} 평 / {{ overlayInfo.price / 10000 }} 만원
        </p>
        <p class="overlay-detail">
          방 {{ overlayInfo.roomCount }}개 / 욕실 {{ overlayInfo.bathroomCount }}개
        </p>
        <p class="overlay-detail">
          {{ overlayInfo.roomFloor }}층 / {{ overlayInfo.totalFloors }}층
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-family-primary);
  box-sizing: border-box;
}
.card {
  width: 260px;
  height: 260px;
  position: relative;
  border-radius: 10px;
  display: block;
}
.house-image {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}
.favorite {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 18px;
  bottom: 24px;
  z-index: 200;
  cursor: pointer;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 검은 반투명 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 100;
}
.overlay-aptNm {
  color: #ffffff; /* 흰색 글씨 */
  font-size: 24px;
  font-weight: bold;
  z-index: 200;
  margin-bottom: 20px;
}
.overlay-detail {
  color: var(--gray5);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  z-index: 200;
  margin-bottom: 5px;
}
span {
  margin-bottom: 10px;
}
</style>
