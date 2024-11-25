<template>
  <div class="card">
    <router-link :to="`/house/detail/${house.aptSeq}`" class="card-link">
      <div class="card-image">
        <img
          src="https://i.pinimg.com/736x/f9/6a/cd/f96acdb0334d9ab59a731966abee0a0d.jpg"
          alt="House Image"
        />
      </div>
      <div class="card-info">
        <!-- 월세 정보 -->
        <div class="rental-info">
          <span class="price">{{ house.aptName }}</span>
        </div>
        <!-- 추가 정보 -->
        <div class="additional-info">
          <p class="room-type">아파트</p>
          <p class="location">{{ house.gugun }} {{ house.dong }} {{ house.jibun }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HouseCard",
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
* {
  font-family: var(--font-family-primary);
  color: var(--black);
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
