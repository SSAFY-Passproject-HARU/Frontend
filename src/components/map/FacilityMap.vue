<template>
  <div class="main">
    <div id="category">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="{ on: currCategory === category.id }"
        @click="onClickCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;

export default {
  name: "FacilityMapView",
  props: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  data() {
    return {
      map: null,
      placeOverlay: null,
      contentNode: null,
      markers: [],
      currCategory: '',
      ps: null,
      categories: [
        { id: 'BK9', name: '은행' },
        { id: 'MT1', name: '마트' },
        { id: 'PM9', name: '약국' },
        { id: 'OL7', name: '주유소' },
        { id: 'CE7', name: '카페' },
        { id: 'CS2', name: '편의점' },
      ],
    };
  },
  mounted() {
    this.loadKakaoMap();
  },
  methods: {
    loadKakaoMap() {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_MAP_API_KEY}&libraries=services`;
        document.head.appendChild(script);
      }
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 2,
        maxLevel: 4,
      };
      this.map = new kakao.maps.Map(container, options);
      if (window.kakao.maps.services) {
        this.ps = new kakao.maps.services.Places(this.map);
        console.log("로드됨");
      } else {
        console.error("카카오맵 서비스 API가 로드되지 않았습니다.");
      }
    },
    onClickCategory(categoryId) {
      if (this.currCategory === categoryId) {
        this.currCategory = '';
        this.removeMarkers();
      } else {
        this.currCategory = categoryId;
        this.searchPlaces();
      }
    },
    searchPlaces() {
      this.removeMarkers();
      this.ps.categorySearch(this.currCategory, this.placesSearchCB, { useMapBounds: true });
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        this.displayPlaces(data);
        console.log(data);
      }
    },
    displayPlaces(places) {
      for (let i = 0; i < places.length; i++) {
        const position = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = this.addMarker(position);
        kakao.maps.event.addListener(marker, 'click', () => {
          this.displayPlaceInfo(places[i], position);
        });
      }
    },
    addMarker(position) {
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(this.map);
      this.markers.push(marker);
      return marker;
    },
    removeMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    displayPlaceInfo(place, position) {
      this.contentNode.innerHTML = `
        <div class="placeinfo">
          <a class="title" href="${place.place_url}" target="_blank">${place.place_name}</a>
          <span>${place.road_address_name || place.address_name}</span>
          <span class="tel">${place.phone || ''}</span>
        </div>
      `;
      this.placeOverlay.setPosition(position);
      this.placeOverlay.setMap(this.map);
    },
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
}
#map {
  width: 100%;
  height: 500px;
}
#category {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
#category button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
#category button.on {
  background-color: #d95050;
  color: white;
}
</style>
