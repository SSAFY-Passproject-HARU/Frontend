<script setup></script>

<template>
  <div class="card">
    <div class="card-image">
      <img
        src="https://image.hanssem.com/hsimg/upload/homeIdea/2023/02/27/1677477451098_0.jpg"
        alt="House Image"
        class="house-image"
      />
      <img src="@/assets/images/icons/icon-star-gray.png" alt="favorite" class="favorite" />
      <div class="overlay"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-family-primary);
}

.card {
  width: 360px;
  height: 360px;
  position: relative;
  background-color: white;
  display: block;
}

.house-image {
  width: 360px;
  height: 360px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.favorite {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 18px;
  bottom: 24px;
}

.overlay {
}
</style>
