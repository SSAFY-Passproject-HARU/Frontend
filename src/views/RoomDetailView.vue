<template>
    <div class="detail">
        <NavBar />
        <div class="main">
            <TopBar />
            <div class="detail-view content">
                <div class="view">
                    <!-- 집의 메인 이미지 -->
                    <img class="main-image"
                        :src="mainImageUrl"
                        alt="House Image" />

                    <!-- 기본 정보 -->
                    <div class="house-information" v-if="roomData">
                        <p class="house-type">아파트</p>
                        <h1 class="apt-name">{{ houseDetails.aptName }}</h1>
                        <h2 class="price">매매 {{ roomData.price }}원</h2>
                    </div>

                    <!-- 집 설명 -->
                    <div class="house-description" v-if="roomData">
                        <h2 class="title">{{ roomData.title }}</h2>
                        <p>{{ roomData.description }}</p>
                    </div>

                    <!-- 집 설명 -->
                    <div class="house-description" v-if="roomData">
                        <ul>
                            <li>건물 이름: {{ houseDetails.aptName}}</li>
                            <li>방 종류: {{ roomData.roomType}}</li>
                            <li>해당층/건물층: {{ roomData.roomFloor }}층 / {{ roomData.totalFloors }}층</li>
                            <li>면적: {{ roomData.area }}m²</li>
                            <li>방 수 / 욕실 수: {{ roomData.roomCount }}개 / {{ roomData.bathroomCount }}개</li>
                        </ul>
                    </div>

                    <!-- 편의시설 -->
                    <div class="amenities" v-if="houseDetails">
                        <h2>편의시설</h2>
                        <FacilityMap class="component" :latitude="houseDetails.latitude"
                            :longitude="houseDetails.longitude" />
                    </div>

                    <!-- 로드뷰 -->
                    <div class="road-view" v-if="houseDetails">
                        <h2>로드뷰</h2>
                        <RoadView class="component" :latitude="houseDetails.latitude"
                            :longitude="houseDetails.longitude" />
                    </div>

                    <!-- 거래금액 그래프 -->
                    <div class="price-graph" v-if="houseDetails">
                        <h2>거래금액 그래프</h2>
                        <TransactionGraph class="component" :aptSeq="houseDetails.aptSeq" />
                    </div>

                    <!-- 관심 목록에 추가/삭제 버튼 -->
                    <div class="contact-buttons">
                        <button class="btn-like" @click="likeRoom">관심 목록에 추가</button>
                        <button class="btn-remove" @click="removeFavorite">관심 목록에서 제거</button>
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
    name: "RoomDetailView",
    components: { NavBar, TopBar, RoadView, FacilityMap, TransactionGraph },
    data() {
        return {
            userId: "user", // 나중에 바꿔야 함
            roomId: null,
            roomData: null,       // 매물 기본 정보
            houseDetails: null, // 아파트 상세 정보
            roomImages: [],
            mainImageUrl: "", // 메인 이미지 URL 추가
            isFavorite: false, // 관심 목록 여부
        };
    },
    mounted() {
        this.roomId = this.$route.params.roomId;
        this.fetchRoomData(); // 매물 정보 로드
    },
    methods: {
        async fetchRoomData() {
            try {
                // 1. 매물 기본 정보 요청
                const roomResponse = await axios.get(`http://localhost:8080/room/detail/${this.roomId}`);
                this.roomData = roomResponse.data;

                console.log("roomData: " + this.roomData);

                // 2. aptSeq를 이용해 아파트 상세 정보 요청
                const houseResponse = await axios.get(`http://localhost:8080/home/list/${this.roomData.aptSeq}`);
                this.houseDetails = houseResponse.data[0]; // 응답이 배열일 경우 첫 번째 객체 사용
                console.log(this.houseDetails.aptName);

                // 3. 이미지 정보 요청
                const imageResponse = await axios.get(`http://localhost:8080/room/images/${this.roomId}`);
                this.roomImages = imageResponse.data; // 이미지 정보 저장
                console.log(this.roomImages);

                // 메인 이미지 URL 설정
                if (this.roomImages.length > 0) {
                    // 예시로 첫 번째 이미지를 메인 이미지로 사용
                    this.mainImageUrl = "/images/" + this.roomImages[0].imageUrl;
                    console.log(this.mainImageUrl);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        // 관심 목록에 추가
        async likeRoom() {
            try {
                const likeData = {
                    userId: this.userId, // 로그인된 사용자 ID (현재 하드코딩 상태)
                    roomId: this.roomId
                };
                await axios.post('http://localhost:8080/room/like', likeData);
                this.isFavorite = true; // 관심 목록에 추가된 상태로 변경
                alert('관심 목록에 추가되었습니다!');
            } catch (error) {
                console.error('Error liking room:', error);
                alert('관심 목록 추가에 실패했습니다.');
            }
        },

        // 관심 목록에서 제거
        async removeFavorite() {
            try {
                const likeData = {
                    userId: this.userId, // 로그인된 사용자 ID (현재 하드코딩 상태)
                    roomId: this.roomId
                };
                await axios.delete('http://localhost:8080/room/removelike', { data: likeData });
                this.isFavorite = false; // 관심 목록에서 제거된 상태로 변경
                alert('관심 목록에서 제거되었습니다!');
            } catch (error) {
                console.error('Error removing favorite:', error);
                alert('관심 목록에서 제거에 실패했습니다.');
            }
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

.view>* {
    margin-left: 36px;
    margin-right: 36px;
    margin-bottom: 36px;
}

.view>div {
    border-bottom: 1px solid var(--gray8);
    /* 기본적으로 모든 자식 요소에 하단 테두리 */
}

.view>div:last-child {
    border-bottom: none;
    /* 마지막 자식 요소는 하단 테두리 제외 */
}

.main-image {
    margin: 36px;
    height: 60vh;
    object-fit: cover;
}

.view>div>* {
    margin-bottom: 15px;
}

.view>div>*:last-child {
    margin-bottom: 36px;
}

.view>div>p,
.view>div>ul {
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