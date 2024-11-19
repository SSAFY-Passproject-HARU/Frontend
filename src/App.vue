<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/common/NavBar.vue'
import SearchBar from './components/common/SearchBar.vue'
</script>

<template>
  <div class="home">
    <NavBar />
    <SearchBar />
    <RouterView class="container"/>
  </div>
</template>

<style scoped>
.container {
  margin-top: 95px;
  margin-left: 240px;
}
</style>
