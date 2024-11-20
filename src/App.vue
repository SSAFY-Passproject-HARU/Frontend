<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/common/NavBar.vue";
import TopBar from "./components/common/TopBar.vue";
import "./styles/variables.scss";
</script>

<template>
  <div class="container">
    <div class="inner-container">
      <NavBar />
      <div class="main">
        <TopBar />
        <RouterView class="content" />
      </div>
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

.main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.content {
  flex-grow: 1;
  padding: 36px;
  background-color: #d9f7d7;
  overflow: auto;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
