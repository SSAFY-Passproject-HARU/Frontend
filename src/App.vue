<script setup>
import "./styles/variables.scss";

import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import router from "./router";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUserData(); // 페이지 로드 시 사용자 데이터 가져오기
  if (!userStore.user.id) {
    router.push("/login");
  }
});
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
}

.inner-container {
  width: 1800px;
  display: flex;
  position: relative;
  background-color: white;
  overflow-y: hidden;
}
</style>
