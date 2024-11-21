<template>
    <div class="detail-view">
      <div class="view">
      <!-- 집의 메인 이미지 -->
      <img
        class="main-image"
        src="https://i.pinimg.com/736x/c2/b9/3a/c2b93a893b7f1b7af5953980ed4b394c.jpg"
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
        <h2 class="title">둘이 살기 좋은 집</h2>
        <p>집 설명!!!!!!!!!!!!!!!!!!!!!!!!</p>
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
      <div class="amenities">
        <h2>편의시설</h2>
        <p>주차 공간, 24시간 경비, 헬스장, 커뮤니티 시설 등 다양한 편의시설이 제공됩니다.</p>
      </div>

      <!-- 로드뷰 -->
      <div class="road-view">
        <h2>로드뷰</h2>
        <img src="https://via.placeholder.com/900x400.png?text=로드뷰+이미지" alt="Road View" />
      </div>

      <!-- 거래금액 그래프 -->
      <div class="price-graph">
        <h2>거래금액 그래프</h2>
        <img src="https://via.placeholder.com/900x400.png?text=그래프" alt="Price Graph" />
      </div>

      <!-- 문의 버튼 -->
      <div class="contact-buttons">
        <button class="btn-contact">연락처</button>
        <button class="btn-like">관심 목록에 추가</button>
      </div>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: "HouseDetailView",
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
</style>