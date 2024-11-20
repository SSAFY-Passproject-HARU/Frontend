<template>
  <div class="main">
    <div id="map"></div>
  </div>
</template>

<script>
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
export default {
  name: "KakaoMap",
  data() {
    return {
      markers: [], // 마커 배열
      infowindow: null,
    };
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

      // 마커 추가
      this.addMarker(33.450701, 126.570667);
    },

    // 마커 추가 메서드
    addMarker(lat, lng) {
      // LatLng 객체 생성
      const position = new kakao.maps.LatLng(lat, lng);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: position, // 마커 위치 지정
      });

      // 마커를 지도에 표시
      marker.setMap(this.map);

      // 마커를 배열에 저장 (선택적)
      this.markers.push(marker);
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