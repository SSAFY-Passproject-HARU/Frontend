<template>
  <div class="detail">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="detail-view content">
        <div class="view">
          <!-- 집의 메인 이미지 -->
          <img
            class="main-image"
            src="https://i.pinimg.com/enabled_lo_mid/736x/be/09/11/be091168f59095433d0befe8a451d6d3.jpg"
            alt="House Image" style="display: none;"
          />

          <!-- 기본 정보 -->
          <div class="house-information" v-if="houseDetails">
            <p class="house-type">아파트</p>
            <h1 class="price">{{ houseDetails[0].aptName }}</h1>
          </div>

          <!-- 매물 리스트 -->
          <div class="room-list" v-if="roomList">
            <h2>매물 리스트</h2>
            <ul>
              <li
                v-for="room in roomList"
                :key="room.roomId"
                @click="goToRoomDetail(room.roomId)"
              >
                <h3>{{ room.title }}</h3>
                <p>{{ formatPrice(room.price) }} 원</p>
              </li>
            </ul>
          </div>
          <!-- 매물이 없을 때 표시할 메시지 -->
          <div class="no-room-list" v-else>
            <h2>매물이 없습니다.</h2>
          </div>

          <!-- 편의시설 -->
          <div class="amenities" v-if="houseDetails">
            <h2>편의시설</h2>
            <FacilityMap
              class="component"
              :latitude="houseDetails[0].latitude"
              :longitude="houseDetails[0].longitude"
            />
          </div>

          <!-- 로드뷰 -->
          <div class="road-view" v-if="houseDetails">
            <h2>로드뷰</h2>
            <RoadView
              class="component"
              :latitude="houseDetails[0].latitude"
              :longitude="houseDetails[0].longitude"
            />
          </div>

          <!-- 거래금액 그래프 -->
          <div class="price-graph" v-if="houseDetails">
            <h2>거래금액 그래프</h2>
            <TransactionGraph
              class="component"
              :aptSeq="houseDetails[0].aptSeq"
            />
          </div>

          <!-- 매물 등록 버튼 -->
          <div class="register-button">
            <button @click="goToRegisterPage" class="btn-register">매물 등록</button>
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
import RoadView from "@/components/map/RoadView.vue";
import FacilityMap from "@/components/map/FacilityMap.vue";
import TransactionGraph from "@/components/house/TransactionGraph.vue";

export default {
  name: "HouseDetailView",
  components: { NavBar, TopBar, RoadView, FacilityMap, TransactionGraph },
  data() {
    return {
      aptSeq: null,
      houseDetails: null, // 아파트 상세 정보
      roomList: null // 매물 리스트 데이터
    };
  },
  mounted() {
    this.aptSeq = this.$route.params.aptSeq;
    this.fetchHouseDetails(); // 데이터 로드
    this.fetchRoomList(); // 매물 리스트 로드
  },
  methods: {
    fetchHouseDetails() {
      // API로 아파트 상세 정보 요청
      axios
        .get(`http://localhost:8080/home/list/${this.aptSeq}`)
        .then((response) => {
          // 성공적으로 데이터를 받으면 houseDetails에 할당
          this.houseDetails = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching house details:", error);
        });
    },
    // 매물 리스트 불러오기
    fetchRoomList() {
      axios.get(`http://localhost:8080/room/list/${this.aptSeq}`)
        .then((response) => { this.roomList = response.data; })
        .catch((error) => { console.error('Error:', error); });
    },
    // 상세 페이지로 이동
    goToRoomDetail(roomId) {
      this.$router.push(`/room/detail/${roomId}`);
    },
    goToRegisterPage() {
      this.$router.push(`/room/register/${this.aptSeq}`);
    },
    // 가격 포맷팅 (예: 1000 -> 1,000 원)
    formatPrice(price) {
      return new Intl.NumberFormat().format(price);
    }
  },
};
</script>

<style scoped>
.detail {
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
}

.content::-webkit-scrollbar {
  display: none;
}

* {
  font-family: var(--font-family-primary);
  font-size: var(--font-weight-regular);
}

h1 {
  font-size: 32px;
  font-weight: var(--font-weight-bold);
}

h2 {
  font-size: 24px;
  font-weight: var(--font-weight-bold);
}

li {
  margin-bottom: 10px;
}

.detail-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}

.view {
  padding-top: 40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--secondary-border);
}

.view > * {
  margin-left: 36px;
  margin-right: 36px;
  margin-bottom: 36px;
}

.view > div {
  border-bottom: 1px solid var(--gray8); /* 기본적으로 모든 자식 요소에 하단 테두리 */
}

.view > div:last-child {
  border-bottom: none; /* 마지막 자식 요소는 하단 테두리 제외 */
}

.main-image {
  margin: 36px;
  height: 60vh;
  object-fit: cover;
}

.view > div > * {
  margin-bottom: 15px;
}

.view > div > *:last-child {
  margin-bottom: 36px;
}

.view > div > p,
.view > div > ul {
  font-size: 18px;
}

.house-type {
  color: var(--gray1);
}

.component {
  display: block;
  width: 100%;
}

.room-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.room-list li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid var(--gray8);
  border-radius: 8px;
  background-color: var(--white);
  transition: box-shadow 0.3s;
}

.room-list li:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.room-list h3 {
  font-size: 20px;
  margin: 0 0 10px 0;
}

.room-list p {
  font-size: 18px;
  color: var(--gray1);
  margin: 0;
}

.register-button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.btn-register {
  background-color: var(--primary);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background-color: var(--primary-dark);
}

.btn-register:focus {
  outline: none;
}

</style>
