<script setup>
defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <a class="card" :href="news.originalLink" target="_blank">
    <div class="news-title" v-html="news.title"></div>
    <div class="news-content" v-html="news.description"></div>
  </a>
</template>

<style scoped>
* {
  font-family: var(--font-family-primary);
  box-sizing: border-box;
}

.card {
  width: 260px; /* 224 */
  height: 180px;
  position: relative;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.news-title {
  height: 47px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--black);
  line-height: 22px;
  margin-bottom: 10px;
  overflow-y: hidden;
}

.news-content {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  color: var(--gray1);
  overflow-y: hidden;
}
</style>
