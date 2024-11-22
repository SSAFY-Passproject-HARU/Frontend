<template>
  <div class="page">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <h1>매물 등록</h1>
        <div class="view">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
export default {
  name: "HouseRegisterView",
  components: { NavBar, TopBar },
}
</script>

<style scoped>
.page {
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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}

.content::-webkit-scrollbar {
  display: none;
}
.view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--secondary-border);
}

* {
  font-family: var(--font-family-primary);
}
h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 36px;
}
</style>