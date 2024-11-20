<template>
  <div class="card">
    <div class="card-image">
      <img
        src="https://i.pinimg.com/enabled_lo_mid/736x/49/3a/59/493a59d3a8f37d60b5227a2cf2fb2899.jpg"
        alt="House Image"
      />
    </div>
    <div class="card-info">
      <!-- 월세 정보 -->
      <div class="rental-info">
        <span class="price">월세 100/30</span>
      </div>
      <!-- 추가 정보 -->
      <div class="additional-info">
        <p class="room-type">원룸</p>
        <p class="floor-size">3층, 20.00m²</p>
        <p class="maintenance-fee">관리비 5만</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseCard",
};
</script>

<style scoped>
* {
  font-family: var(--font-family-primary);
}
.card {
  display: flex;
  overflow: hidden;
}

.card-image {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  margin: 10px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  flex-grow: 1;
}

.rental-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.price {
  font-size: 18px;
  font-weight: var(--font-weight-bold);
}

.additional-info p {
  font-size: 14px;
  margin: 4px 0;
}
</style>
