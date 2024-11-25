<script setup>
import { ref, defineProps, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // router 추가

const router = useRouter(); // router 객체 생성

// props로 받은 매물 정보
const props = defineProps({
  house: {
    type: Object, // 전달받은 데이터 타입 정의 (Object)
    required: true // 필수 여부 설정
  }
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

// 아파트 정보 가져오기
const getAptInfo = async () => {
  try {
    const responseAptName = await axios.get(
      `http://localhost:8080/room/detail/${props.house.roomId}/apt-name`
    );
    const responseRoomDetail = await axios.get(`http://localhost:8080/room/detail/${props.house.roomId}`);

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
      <img
        src="https://image.hanssem.com/hsimg/upload/homeIdea/2023/02/27/1677477451098_0.jpg"
        alt="House Image"
        class="house-image"
      />
      <img src="@/assets/images/icons/icon-star-gray.png" alt="favorite" class="favorite" />

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
