<script setup></script>

<template>
  <div class="landing-view">
    <img 
      class="landing-background"
      src="@/assets/images/landing-background.png"
      alt="landing-background"
    />
    <div class="landing-text">
      당신의 더 나은 <span class="landing-text-primary">하루</span>를 보낼 집, <br/>
      <span class="landing-text-primary">하루</span>에서 찾아보세요
    </div>
    <router-link to="/login" class="landing-button">시작하기</router-link>
  </div>
</template>

<style scoped>
.login-view {
  width: 100%;
  height: 100%;
  background-color: var(--secondary);
  position: relative;
}

.landing-background {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 0 0 400px 0;
  z-index: 1;
}

.landing-text {
  position: absolute;
  top: 100px;
  left: 210px;
  font-size: var(--font-size-landinglogo);
  font-weight: var(--font-weight-bold);
  color: var(--secondary);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
  line-height: 80px;
  -webkit-text-stroke: 1px rgba(104, 98, 91, 0.1);
}

.landing-text-primary {
  color: var(--primary);
}

.landing-button {
  position: absolute;
  bottom: 70px;
  right: 70px;
  background-color: var(--primary);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-largelogo);
  font-weight: var(--font-weight-bold);
  color: var(--white);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
  padding: 30px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);;
}
</style>