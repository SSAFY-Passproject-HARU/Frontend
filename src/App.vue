<script setup>
import "./styles/variables.scss";
</script>

<template>
  <div class="container">
    <div class="inner-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이를 차지 */
  background-color: skyblue;
}

.inner-container {
  width: 1440px;
  display: flex;
  position: relative;
  background-color: white;
}
</style>
