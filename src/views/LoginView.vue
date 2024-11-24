<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const loginFailMessage = ref(""); // 로그인 실패 메시지
const userId = ref(""); // 입력받은 아이디
const password = ref(""); // 입력받은 비밀번호
const saveIdChecked = ref(false); // 아이디 저장 체크박스 상태

// 페이지 로드 시 쿠키에서 userId 가져오기
onMounted(() => {
  const savedUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (savedUserId) {
    saveIdChecked.value = true;
    userId.value = savedUserId;
  }
});

// 로그인 처리 함수
const handleLogin = async (event) => {
  event.preventDefault(); 
  try {
    await userStore.login(userId.value, password.value); 
    console.log("userId.value:" + userId.value);
    console.log("password.value:" + password.value);

    // 아이디 저장 체크박스 상태에 따른 쿠키 처리
    if (saveIdChecked.value) {
      document.cookie = `userId=${userId.value}; max-age=31536000`; // 1년 유지
    } else {
      document.cookie = `userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC`; // 쿠키 삭제
    }

    alert("로그인에 성공했습니다."); // 로그인 성공 알림
    router.push("/"); // 홈 페이지로 이동
  } catch (error) {
    loginFailMessage.value = "아이디 또는 비밀번호가 잘못되었습니다."; // 로그인 실패 메시지
  }
};

// 페이지 이동 함수
const navigateTo = (path) => {
  router.push({ path });
};
</script>

<template>
  <div class="login-view">
    <div class="overlay" />
    <img
      class="login-background"
      src="@/assets/images/login-background.png"
      alt="login-background"
    />
    <div class="login-container">
      <div class="login-content">
        <div class="login-logo">HARU</div>
        <form class="login-form" @submit="handleLogin">
          <!-- 아이디 입력 -->
          <input
            class="login-id"
            v-model="userId"
            placeholder="아이디"
            required
          />
          <!-- 비밀번호 입력 -->
          <input
            class="login-pw"
            v-model="password"
            type="password"
            placeholder="비밀번호"
            required
          />
          <div class="login-others">
            <!-- 아이디 저장 체크박스 -->
            <div>
              <input
                class="login-checkbox"
                type="checkbox"
                v-model="saveIdChecked"
              />
              아이디 저장
            </div>
            <!-- 비밀번호 찾기 링크 -->
            <router-link to="/passwordreset" class="login-passwordreset">
              비밀번호 찾기
            </router-link>
          </div>
          <!-- 로그인 버튼 -->
          <button class="login-button" type="submit">로그인</button>
          <!-- 회원가입 링크 -->
          <router-link to="/signup" class="signup-button">회원가입</router-link>
        </form>

        <!-- 로그인 실패 메시지 -->
        <div v-if="loginFailMessage" style="color: red; margin-top: 10px;">
          {{ loginFailMessage }}
        </div>

        <div class="login-comment">
          당신의 더 나은 하루를 위한 집,
          <span class="login-comment-highlight">하루</span>에서 찾아보세요.
        </div>
      </div>
      <img class="login-image" src="@/assets/images/login-image.png" />
    </div>
  </div>
</template>

<style scoped>
/* 기존 스타일 유지 */
* {
  box-sizing: border-box;
}
.login-view {
  width: 100%;
  height: 100%;
  position: relative;
}
.overlay {
  width: 100%;
  height: 100%;
  background-color: var(--gray6);
  position: absolute;
}
.login-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.login-container {
  width: 1320px;
  height: 652px;
  display: flex;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.3);
}
.login-content {
  width: 660px;
  height: 652px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  position: relative;
}
.login-logo {
  color: var(--primary);
  font-family: var(--font-family-logo);
  font-size: var(--font-size-largelogo);
  font-weight: var(--font-weight-bold);
  margin-bottom: 40px;
}
.login-form {
  width: 322px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.login-id,
.login-pw {
  width: 322px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 26px 20px 20px 20px;
}
input::placeholder {
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
}
input:focus {
  outline: 1px solid var(--primary);
  outline-offset: 0;
}
.login-others {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}
.login-button {
  width: 100%;
  background-color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 10px;
  color: var(--white);
  padding: 20px 20px 20px 20px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
  margin-top: 10px;
}
.signup-button {
  width: 100%;
  background-color: var(--secondary);
  border: 1px solid #dad3ca;
  border-radius: 10px;
  color: var(--primary);
  padding: 20px 20px 20px 20px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
  display: flex;
  justify-content: center;
}
.login-checkbox {
  accent-color: var(--primary);
}
.login-passwordreset {
  color: var(--gray3);
  text-decoration: underline;
  text-decoration-color: var(--gray3);
}
.login-comment {
  position: absolute;
  bottom: 20px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  color: var(--gray6);
}
.login-image {
  width: 660px;
  height: 652px;
  object-fit: cover;
  position: absolute;
  right: 0;
  border-radius: 0 10px 10px 0;
}
</style>
