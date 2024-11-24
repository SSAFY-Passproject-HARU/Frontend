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
        alt="House Image"
      />

      <!-- 기본 정보 -->
      <div class="house-information" v-if="houseDetails">
        <p class="house-type">아파트</p>
        <h1 class="price">{{ houseDetails[0].aptName }}</h1>
        <p class="area">공급 81.5m² | 방 3, 욕실 2</p>
        <p>Apartment Seq: {{ aptSeq }}</p>
      </div>

      <!-- 집 설명 -->
      <div class="house-description">
        <ul>
          <li>건물 이름: 장안뉴시티(도시형)</li>
          <li>방 종류: 아파트</li>
          <li>해당층/건물층: 14층 / 14층</li>
          <li>전용 면적 / 공급 면적: 17.63m² / 27.73m²</li>
          <li>방 수 / 욕실 수: 1개 / 1개</li>
        </ul>
      </div>

      <!-- 편의시설 -->
      <div class="amenities" v-if="houseDetails">
        <h2>편의시설</h2>
        <FacilityMap class="component" :latitude="houseDetails[0].latitude" :longitude="houseDetails[0].longitude"/>
      </div>

      <!-- 로드뷰 -->
      <div class="road-view" v-if="houseDetails">
        <h2>로드뷰</h2>
        <RoadView class="component" :latitude="houseDetails[0].latitude" :longitude="houseDetails[0].longitude"/>
      </div>

      <!-- 거래금액 그래프 -->
      <div class="price-graph" v-if="houseDetails">
        <h2>거래금액 그래프</h2>
        <TransactionGraph class="component" :aptSeq="houseDetails[0].aptSeq"/>
      </div>

      <!-- 문의 버튼 -->
      <div class="contact-buttons">
        <button class="btn-contact">연락처</button>
        <button class="btn-like">관심 목록에 추가</button>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import RoadView from '@/components/map/RoadView.vue';
import FacilityMap from '@/components/map/FacilityMap.vue';
import TransactionGraph from '@/components/house/TransactionGraph.vue';

export default {
  name: "HouseDetailView",
  components: { NavBar, TopBar, RoadView, FacilityMap, TransactionGraph },
  data() {
    return {
      aptSeq: null,
      houseDetails: null, // 아파트 상세 정보
    };
  },
  mounted() {
    this.aptSeq = this.$route.params.aptSeq;
    this.fetchHouseDetails(); // 데이터 로드
  },
  methods: {
    fetchHouseDetails() {
      // API로 아파트 상세 정보 요청
      axios.get(`http://localhost:8080/home/list/${this.aptSeq}`)
        .then((response) => {
          // 성공적으로 데이터를 받으면 houseDetails에 할당
          this.houseDetails = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching house details:', error);
        });
    },
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
.view > div > p, .view > div > ul {
  font-size: 18px;
}
.house-type {
  color: var(--gray1);
}
.component {
  display: block;
  width: 100%;
}
</style>