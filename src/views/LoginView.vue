<script setup>
import HouseImageCard from "@/components/house/HouseImageCard.vue";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
</script>

<template>
  <div class="login-container">
    <div class="overlay" />
    <img
      class="login-background"
      src="@/assets/images/login-background.png"
      alt="login-background"
    />
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: var(--gray6);
  position: absolute;
}

.login-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
</style>
