<script setup>
import HouseImageCard from "@/components/house/HouseImageCard.vue";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
</script>

<template>
  <div class="home">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <div class="top-menu">
          <h1 class="title">맞춤 추천 매물</h1>
        </div>
        <div class="house-list">
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
          <HouseImageCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
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
  background-color: var(--secondary);
  border-radius: 10px 0 0 0;
  overflow: auto;
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}

.top-menu {
  width: calc(260px * 4 + 60px);
  margin-bottom: 36px;
}

.title {
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
}

button {
  border: none;
  background-color: transparent;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
}

.house-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 36px 20px;
}
</style>
