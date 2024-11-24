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
  box-sizing: border-box;
}

.card {
  width: 260px;
  height: 260px;
  position: relative;
  border-radius: 10px;
  display: block;
}

.house-image {
  width: 260px;
  height: 260px;
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
