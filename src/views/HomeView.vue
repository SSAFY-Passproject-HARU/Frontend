<script setup>
import HouseImageCard from "@/components/house/HouseImageCard.vue";
</script>

<template>
  <div class="home">
    <div class="top-menu">
      <h1 class="title">맞춤 추천 매물</h1>
      <button>알고리즘 업데이트하기</button>
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
</template>

<style scoped>
.top-menu {
  width: calc(360px * 3 + 40px);
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
}

.title {
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-header);
  font-weight: var(--font-weight-bold);
}

button {
  border: none;
  background-color: transparent;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}

.house-list {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 36px 20px;
  overflow-y: auto;
}
</style>
