<template>
  <div class="topbar">
    <div class="searchbar">
      <img class="icon" src="@/assets/images/icons/icon-glass.png" alt="search" />
      <input type="text" placeholder="매물 검색" class="custom-input" />
    </div>
    <div class="mypage"></div>
    <router-link to="/mypage" class="mypage">
      <img class="mypage" src="@/assets/images/icons/icon-mypage.png" alt="mypage" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style>
.topbar {
  position: sticky;
  top: 0;
  left: 240px; /* NavBar의 너비(240px)만큼 오른쪽으로 밀어서 배치 */
  right: 0; /* 오른쪽 끝에 맞춤 */
  width: 100%;
  height: 96px;
  padding-right: 48px;
  display: flex;
  align-items: center;
  gap: 112px;
}

.searchbar {
  width: 1000px;
  height: 40px;
  background-color: var(--gray7);
  display: flex;
  align-items: center;
  padding-left: 24px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-light);
  border-radius: 10px;
}

.icon {
  width: 16px;
  height: 17px;
  margin-right: 28px;
}

.custom-input {
  border: none;
  outline: none;
  background-color: var(--gray7);
}

.custom-input::placeholder {
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}

.mypage {
  width: 40px;
  height: 40px;
}
</style>
