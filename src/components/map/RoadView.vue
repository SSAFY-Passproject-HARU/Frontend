<template>
  <div class="main">
    <div id="roadview"></div>
  </div>
</template>

<script>
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
export default {
  name: "RoadView",
  props: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
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
      const roadviewContainer = document.getElementById("roadview");
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      //지도를 생성할 때 필요한 기본 옵션
      var position = new kakao.maps.LatLng(this.latitude, this.longitude); //지도의 중심좌표.
      console.log(position);

      roadviewClient.getNearestPanoId(position, 50, function(panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      }); //지도 생성 및 객체 리턴
    },
  }
}
</script>

<style>
.main {
  display: flex;
}
#roadview {
  width: 100%;
  flex-grow: 1;
  height: 400px;
}
</style>