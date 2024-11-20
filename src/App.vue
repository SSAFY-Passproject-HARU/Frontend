<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/common/NavBar.vue";
import SearchBar from "./components/common/SearchBar.vue";
import "./styles/variables.scss";
</script>

<template>
  <div class="container">
    <NavBar />
    <div class="main">
      <SearchBar />
      <RouterView class="content" />
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  height: 100vh; /* 화면 전체 높이를 차지 */
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  flex-grow: 1;
  margin-top: 95px;
  margin-left: 240px;
  padding: 36px;
  background-color: #d9f7d7;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
