<template>
  <div class="map-view">
    <h1>지도로 보기</h1>
    <div class="view">
      <div class="view-header">
        <select id="sido-select">
          <option value="city">시/도 선택</option>
        </select>
        <select id="gugun-select">
          <option value="city">구/군 선택</option>
        </select>
        <select id="dong-select">
          <option value="city">동 선택</option>
        </select>
      </div>
      <div class="main-content">
        <aside class="list">
          <ul>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
            <li><HouseCard /></li>
          </ul>
        </aside>
        <kakaoMap class="map" />
      </div>
    </div>
  </div>
</template>

<script>
import HouseCard from '@/components/house/HouseCard.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
export default {
  components: { HouseCard, KakaoMap },
  name: 'map'
}
</script>

<style scoped>
* {
  font-family: var(--font-family-primary);
}
h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 36px;
}
select {
  margin: 20px;
  border: solid 1px var(--gray8);
  border-radius: 5px;
  background-color: var(--white);
  padding: 10px;
  font-size: 16px;
}
ul, li {
  list-style: none; 
  margin: 0; 
  padding: 0; 
}
li {
  margin: 0 10px;
  border-bottom: 1px solid var(--gray8);
}
li:last-child {
  border-bottom: none;
}
.map-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}
.view {
  background-color: aqua;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.view-header {
  display: flex;
  align-items: center;
  height: 72px;
  background-color: pink;
}
.main-content {
  display: flex;
  flex-grow: 1;
  background-color: hotpink;
  overflow: hidden;
}
.list {
  width: 340px;
  min-width: 340px;
  background-color: greenyellow;
  overflow-y: auto;
}
.list::-webkit-scrollbar {
  display: none;
}
.map {
  flex-grow: 1;
  background-color: yellow;
}
</style>