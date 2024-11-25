<template>
  <div class="topbar">
    <div class="searchbar">
      <img class="icon" src="@/assets/images/icons/icon-glass.png" alt="search" />
      <input type="text" placeholder="매물 검색" class="custom-input" />
    </div>
    <div class="mypage-wrapper">
      <img
        class="mypage"
        src="@/assets/images/icons/icon-mypage.png"
        alt="mypage"
        @click="toggleDropdown"
      />
      <div v-if="isDropdownVisible" class="dropdown">
        <ul>
          <li @click="goToMyPage">마이페이지</li>
          <li @click="logout">로그아웃</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  name: "TopBar",
  data() {
    return {
      isDropdownVisible: false, // 드롭다운 표시 여부
    };
  },
  methods: {
    // 드롭다운 토글
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    // 마이페이지 이동
    goToMyPage() {
      this.$router.push("/mypage");
    },
    // 로그아웃 처리
    async logout() {
      const store = useUserStore(); // Pinia store 사용
      try {
        await store.logout(); // 로그아웃 API 호출
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 중 문제가 발생했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  left: 240px;
  right: 0;
  height: 96px;
  padding: 20px 48px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 왼쪽과 오른쪽으로 배치 */
  z-index: 100;
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

.mypage-wrapper {
  position: relative;
}

.mypage {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 125px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 200;
  padding-top: 5px;
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>
