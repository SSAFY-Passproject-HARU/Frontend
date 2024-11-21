<template>
  <div class="main">
    <div id="map"></div>
  </div>
</template>

<script>
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
export default {
  name: "KakaoMap",
  props: {
    houses: {
      type: Array,  // houses는 배열이어야 하므로 수정
      required: true,
    },
  },
  data() {
    return {
      markers: [], // 마커 배열
      overlays: [], // 오버레이 배열
      infowindow: null,
    };
  },
  watch: {
    houses: {
      handler(newHouses) {
        console.log("houses가 변경되었습니다:", newHouses);

        // 마커 초기화 후 새 데이터로 마커 추가
        this.clearMarkers();
        this.clearOverlays();
        this.addMarkersForHouses(newHouses);
      },
      deep: true, // 객체 내부까지 감시
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_MAP_API_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도 초기 위치
        level: 3, // 줌 레벨
        maxLevel: 5, // 최대 줌 레벨
      };

      // 지도 생성
      this.map = new kakao.maps.Map(container, options);
    },

    // 기존 마커 초기화
    clearMarkers() {
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];
    },

    // 기존 오버레이 초기화
    clearOverlays() {
      this.overlays.forEach((overlay) => overlay.setMap(null));
      this.overlays = [];
    },

    // 새로운 houses 데이터를 기반으로 마커 추가
    addMarkersForHouses(houses) {
      if (houses.length > 0) {
        // 첫 번째 house의 좌표로 지도 중심 이동
        this.panToFirstHouse(houses[0]);

        houses.forEach((house) => {
          this.addMarker(house.aptName, house.latitude, house.longitude);
        });
      }
    },

    // 마커 추가 메서드
    addMarker(name, lat, lng) {
      // LatLng 객체 생성
      const position = new kakao.maps.LatLng(lat, lng);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: position, // 마커 위치 지정
      });

      // 마커를 지도에 표시
      marker.setMap(this.map);

      // 커스텀 오버레이 생성
      var content = `
      <div style="padding: 5px; background-color: var(--gray6); color: #fff;">${name}</div>
      `;
      const overlay = new kakao.maps.CustomOverlay({
        map: this.map,
        position: position,
        content: content,
      });

      // 마커를 지도에 표시
      overlay.setMap(this.map);

      // 마커를 배열에 저장
      this.markers.push(marker);

      // 오버레이를 배열에 저장
      this.overlays.push(overlay);
    },

    // 첫 번째 house의 좌표로 지도 중심 이동
    panToFirstHouse(house) {
      const position = new kakao.maps.LatLng(house.latitude, house.longitude);
      this.map.panTo(position);
    },
  },
};
</script>


<style>
.main {
  display: flex;
}
#map {
  width: 100%;
  flex-grow: 1;
}
</style>