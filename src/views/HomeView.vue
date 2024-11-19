<template>
  <div class="home">
    <NavBar />
    <SearchBar />
    <div class="content">
      <h1>Home</h1>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar.vue'
import SearchBar from '../components/common/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    SearchBar
  }
}
</script>

<style scoped>
.content {
  margin-top: 95px;
  margin-left: 240px;
}
</style>