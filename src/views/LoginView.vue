<script setup></script>

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
        <form class="login-form">
          <input class="login-id" placeholder="아이디" />
          <input class="login-pw" placeholder="비밀번호" />
          <div class="login-others">
            <div>
              <input class="login-checkbox" type="checkbox" />
              아이디 저장
            </div>
            <router-link to="/passwordreset" class="login-passwordreset">비밀번호 찾기</router-link>
          </div>
          <button class="login-button" type="submit">로그인</button>
          <router-link to="/signup" class="signup-button">회원가입</router-link>
        </form>
        <!-- <div class="divider">
          <span>또는</span>
        </div> -->
        <div class="login-comment">
          당신의 더 나은 하루를 위한 집, <span class="login-comment-highlight">하루</span>에서
          찾아보세요.
        </div>
      </div>
      <img class="login-image" src="@/assets/images/login-image.png" />
    </div>
  </div>
</template>

<style scoped>
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

/* .divider {
  width: 322px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--gray5);
  font-size: var(--font-size-small);
  margin-top: 30px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-top: 1px solid var(--gray5); // 선의 색상과 두께
  margin: 0 10px; // 선과 텍스트 사이의 간격
} */

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

/* .content::-webkit-scrollbar {
  display: none;
} */
</style>
