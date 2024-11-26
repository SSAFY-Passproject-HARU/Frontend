<script setup>
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// 상태 변수 정의
const sidoOptions = ref([]);
const gugunOptions = ref([]);
const dongOptions = ref([]);
const selectedSido = ref("");
const selectedGugun = ref("");
const selectedDong = ref("");

const formData = reactive({
  id: "",
  nickname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  role: "",
});

// 시도 데이터 가져오기
const fetchSidoData = () => {
  sendRequest("sido", "*00000000");
};

// 구군 데이터 가져오기
const fetchGugunData = (regcode) => {
  sendRequest("gugun", regcode);
};

// 동 데이터 가져오기
const fetchDongData = (regcode) => {
  sendRequest("dong", regcode);
};

// 시도 변경 이벤트 핸들러
const onSidoChange = () => {
  if (selectedSido.value) {
    const regcode = selectedSido.value.code.substr(0, 2) + "*00000";
    fetchGugunData(regcode);
    resetDong();
  } else {
    resetGugunAndDong();
  }
};

// 구군 변경 이벤트 핸들러
const onGugunChange = () => {
  if (selectedGugun.value) {
    const regcode = selectedGugun.value.code.substr(0, 5) + "*";
    fetchDongData(regcode);
  } else {
    resetDong();
  }
};

// 구군 및 동 초기화
const resetGugunAndDong = () => {
  gugunOptions.value = [];
  dongOptions.value = [];
};

// 동 초기화
const resetDong = () => {
  dongOptions.value = [];
};

// 회원가입 요청
const registerUser = () => {
  // 비밀번호 확인 검증
  if (formData.password !== formData.passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 관심 지역 정보 추가
  const userData = {
    ...formData,
    sido: selectedSido.value?.name || "",
    gugun: selectedGugun.value?.name || "",
    dong: selectedDong.value?.name || "",
  };

  // 회원가입 요청
  userStore
    .register(userData)
    .then(() => {
      alert("회원가입이 성공적으로 완료되었습니다.");
    })
    .catch((err) => {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    });
};

// 요청 전송 함수
const sendRequest = (selid, regcode) => {
  const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
  const params = new URLSearchParams({
    regcode_pattern: regcode,
    is_ignore_zero: true,
  }).toString();

  fetch(`${url}?${params}`)
    .then((response) => response.json())
    .then((data) => addOption(selid, data));
};

// 옵션 추가 함수
const addOption = (selid, data) => {
  switch (selid) {
    case "sido":
      sidoOptions.value = data.regcodes.map((regcode) => ({
        code: regcode.code,
        name: regcode.name,
      }));
      break;
    case "gugun":
      gugunOptions.value = data.regcodes.map((regcode) => {
        const nameParts = regcode.name.split(" ");
        const name = nameParts.slice(1).join(" ");
        return { code: regcode.code, name };
      });
      break;
    case "dong":
      dongOptions.value = data.regcodes.map((regcode) => {
        const nameParts = regcode.name.split(" ");
        const name = nameParts.slice(-1).join(" ");
        return { code: regcode.code, name };
      });
      break;
  }
};

// 컴포넌트가 마운트될 때 시도 데이터 로드
onMounted(() => {
  fetchSidoData();
});
</script>


<template>
  <div class="signup-view">
    <div class="overlay" />
    <img
      class="signup-background"
      src="@/assets/images/login-background.png"
      alt="signup-background"
    />
    <div class="signup-container">
      <div class="signup-logo">HARU</div>
      <form class="signup-form" @submit.prevent="registerUser">
        <div class="label-container">
          <label class="signup-label" for="signup-id">아이디</label>
          <input class="signup-id" id="signup-id" v-model="formData.id" placeholder="아이디" />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-name">이름</label>
          <input class="signup-name" id="signup-name" v-model="formData.name" placeholder="이름" />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-nickname">닉네임</label>
          <div class="signup-nickname-container">
            <input
              class="signup-nickname"
              id="signup-nickname"
              v-model="formData.nickname"
              placeholder="닉네임"
            />
          </div>
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-email">이메일</label>
          <input
            class="signup-email"
            id="signup-email"
            v-model="formData.email"
            placeholder="이메일"
          />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-pw">비밀번호</label>
          <input
            class="signup-pw"
            id="signup-pw"
            v-model="formData.password"
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-pwconfirm">비밀번호 확인</label>
          <input
            class="signup-pwconfirm"
            id="signup-pwconfirm"
            v-model="formData.passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
          />
        </div>
        <div class="label-container">
          <label class="signup-label">관심 지역</label>
          <div class="signup-interested-container">
            <select v-model="selectedSido" @change="onSidoChange">
              <option value="">시/도 선택</option>
              <option v-for="sido in sidoOptions" :key="sido.code" :value="sido">
                {{ sido.name }}
              </option>
            </select>
            <select v-model="selectedGugun" @change="onGugunChange">
              <option value="">구/군 선택</option>
              <option v-for="gugun in gugunOptions" :key="gugun.code" :value="gugun">
                {{ gugun.name }}
              </option>
            </select>
            <select v-model="selectedDong">
              <option value="">동 선택</option>
              <option v-for="dong in dongOptions" :key="dong.code" :value="dong">
                {{ dong.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="label-container">
          <label class="signup-label">회원 유형</label>
          <div class="signup-role-container">
            <label>
              <input type="radio" name="role" value="normal" v-model="formData.role" />
              일반 회원
            </label>
            <label>
              <input type="radio" name="role" value="agent" v-model="formData.role" />
              중개인
            </label>
          </div>
        </div>
        <button type="submit" class="signup-button">회원가입</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.signup-view {
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

.signup-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.signup-container {
  width: 1320px;
  height: 750px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signup-logo {
  position: absolute;
  top: 52px;
  left: 52px;
  color: var(--primary);
  font-family: var(--font-family-logo);
  font-size: var(--font-size-largelogo);
  font-weight: var(--font-weight-bold);
}

.signup-form {
  width: 828px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.label-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signup-label {
  color: var(--gray1);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
}

.signup-id,
.signup-name,
.signup-email,
.signup-pw,
.signup-pwconfirm {
  width: 464px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 26px 20px 20px 20px;
}

.signup-nickname-container {
  width: 464px;
  display: flex;
  justify-content: space-between;
}

.signup-nickname {
  width: 328px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 26px 20px 20px 20px;
}

.signup-nickname-confirm {
  width: 116px;
  background-color: var(--secondary);
  border: 1px solid var(--secondary-border);
  border-radius: 10px;
  padding: 22px 10px;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-medium);
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

.signup-interested-container {
  display: flex;
  gap: 20px;
}

select {
  width: 142px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 20px 25px;
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}

option {
  color: var(--gray1);
}

.signup-role-container {
  width: 464px;
  padding: 26px 0;
  display: flex;
  gap: 60px;
}

.signup-button {
  background-color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 15px;
  color: var(--white);
  padding: 15px 30px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-large);
  margin-top: 10px;
  position: absolute;
  right: 32px;
  bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
