<script setup>
import axios from "axios";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
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
  id: userStore.user.id,
  nickname: userStore.user.nickname,
  email: userStore.user.email,
  password: "",
  passwordConfirm: "",
  name: userStore.user.name,
  role: userStore.user.role || "normal"
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

// 구군 선택 시 처리
const onGugunChange = () => {
  if (selectedGugun.value) {
    const regcode = selectedGugun.value.code.substr(0, 5) + "*";
    fetchDongData(regcode);
  } else {
    resetDong();
  }
};

// 구군과 동 초기화
const resetGugunAndDong = () => {
  gugunOptions.value = [];
  dongOptions.value = [];
};

// 동 초기화
const resetDong = () => {
  dongOptions.value = [];
};

// 회원가입 메소드
const editProfile = async () => {
  if (formData.password !== formData.passwordConfirm) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  // 관심 지역 정보 추가
  const updatedData = {
    ...formData,
    sido: selectedSido.value?.name || "",
    gugun: selectedGugun.value?.name || "",
    dong: selectedDong.value?.name || "",
  };

  userStore
    .updateUser(updatedData)
    .then(() => {
      alert("회원정보 수정이 성공적으로 완료되었습니다.");
    })
    .catch((err) => {
      console.error(err);
      alert("회원정보 수정 중 오류가 발생했습니다1.");
    });
};

// API 요청
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

// 옵션 추가
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

// 컴포넌트 마운트 시 시도 데이터 가져오기
onMounted(() => {
  fetchSidoData();
});
</script>


<template>
  <div class="home">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <h1>회원정보 수정</h1>
        <div class="editProfile-userInfo">
          <h2 class="h2-container">사용자 설정</h2>
          <form class="editProfile-form" @submit.prevent="editProfile">
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-id">아이디</label>
              <input class="editProfile-id" id="editProfile-id" :value="userStore.user.id" readonly />
            </div>
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-name">이름</label>
              <input class="editProfile-name" id="editProfile-name" v-model="formData.name" :placeholder="userStore.user.name" />
            </div>
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-nickname">닉네임</label>
              <div class="editProfile-nickname-container">
                <input
                  class="editProfile-nickname"
                  id="editProfile-nickname"
                  v-model="formData.nickname"
                  :placeholder="userStore.user.nickname"
                />
              </div>
            </div>
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-email">이메일</label>
              <input
                class="editProfile-email"
                id="editProfile-email"
                :value="userStore.user.email" 
                readonly
              />
            </div>
            <div class="label-container">
              <label class="editProfile-label">관심 지역</label>
              <div class="editProfile-interested-container">
                <select v-model="selectedSido" @change="onSidoChange">
                  <option value="">시/도 선택</option>
                  <option 
                    v-for="sido in sidoOptions" 
                    :key="sido.code" 
                    :value="sido"
                  >
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
              <label class="editProfile-label">회원 유형</label>
              <div class="editProfile-role-container">
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
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-pw">비밀번호</label>
              <input
                class="editProfile-pw"
                id="editProfile-pw"
                v-model="formData.password"
                type="password"
                placeholder="변경할 비밀번호를 입력해주세요."
              />
            </div>
            <div class="label-container">
              <label class="editProfile-label" for="editProfile-pwconfirm">비밀번호 확인</label>
              <input
                class="editProfile-pwconfirm"
                id="editProfile-pwconfirm"
                v-model="formData.passwordConfirm"
                type="password"
                placeholder="변경할 비밀번호를 한번 더 입력해주세요."
              />
            </div>
            <button type="submit" class="editProfile-button">수정</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-family-primary);
  color: var(--primary);
}

.home {
  width: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.content {
  flex-grow: 1;
  padding: 36px;
  background-color: var(--secondary);
  border-radius: 10px 0 0 0;
  overflow: auto;
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}

h1 {
  margin: 0;
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  margin-bottom: 36px;
}

.editProfile-userInfo {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--primary);
  align-items: center;
}

.h2-container {
  width: 828px;
}

h2 {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  margin-bottom: 16px;
}

.editProfile-form {
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

.editProfile-label {
  color: var(--gray1);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-medium);
}

.editProfile-id,
.editProfile-name,
.editProfile-email,
.editProfile-pw,
.editProfile-pwconfirm {
  width: 464px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
}

.editProfile-nickname-container {
  width: 464px;
  display: flex;
  justify-content: space-between;
}

.editProfile-nickname {
  width: 328px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
}

.editProfile-nickname-confirm {
  width: 116px;
  background-color: var(--secondary);
  border: 1px solid var(--secondary-border);
  border-radius: 10px;
  padding: 22px 10px;
  color: var(--primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-medium);
}
f
input::placeholder {
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}

input:focus {
  outline: 1px solid var(--primary);
  outline-offset: 0;
}

.editProfile-interested-container {
  display: flex;
  gap: 20px;
}

select {
  width: 141px;
  border: 1px solid var(--gray3);
  border-radius: 10px;
  padding: 8px 25px;
  color: var(--gray3);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}

option {
  color: var(--gray1);
}

.editProfile-role-container {
  width: 464px;
  padding: 12px 0;
  display: flex;
  gap: 60px;
}

.editProfile-button {
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
