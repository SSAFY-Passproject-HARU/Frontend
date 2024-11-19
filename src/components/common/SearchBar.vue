<template>
  <div class="search-bar"></div>
</template>

<script>
export default {
  name: "SearchBar",
};
</script>

<style>
.search-bar {
  position: fixed; /* 화면 상단에 고정 */
  top: 0;
  left: 240px; /* NavBar의 너비(240px)만큼 오른쪽으로 밀어서 배치 */
  right: 0; /* 오른쪽 끝에 맞춤 */
  width: 100%;
  height: 96px;
  background-color: rgba(0, 0, 255, 0.5); /* 빨간색 배경에 50% 투명도 */
}
</style>
