<script>
export default {
  data() {
    return {
      sidoOptions: [],
      gugunOptions: [],
      dongOptions: [],
      selectedSido: "", // { code, name } 구조
      selectedGugun: "", // { code, name } 구조
      selectedDong: "", // { code, name } 구조
    };
  },
  mounted() {
    this.fetchSidoData();
  },
  methods: {
    fetchSidoData() {
      this.sendRequest("sido", "*00000000");
    },
    fetchGugunData(regcode) {
      this.sendRequest("gugun", regcode);
    },
    fetchDongData(regcode) {
      this.sendRequest("dong", regcode);
    },
    onSidoChange() {
      if (this.selectedSido) {
        const regcode = this.selectedSido.code.substr(0, 2) + "*00000";
        this.fetchGugunData(regcode);
        this.resetDong();
      } else {
        this.resetGugunAndDong();
      }
    },
    onGugunChange() {
      if (this.selectedGugun) {
        const regcode = this.selectedGugun.code.substr(0, 5) + "*";
        this.fetchDongData(regcode);
      } else {
        this.resetDong();
      }
    },
    onDongChange() {
      if (this.selectedSido && this.selectedGugun && this.selectedDong) {
        this.fetchHouses();
      }
    },
    resetGugunAndDong() {
      this.gugunOptions = [];
      this.dongOptions = [];
    },
    resetDong() {
      this.dongOptions = [];
    },
    sendRequest(selid, regcode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      const params = new URLSearchParams({
        regcode_pattern: regcode,
        is_ignore_zero: true,
      }).toString();

      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => this.addOption(selid, data));
    },
    addOption(selid, data) {
      switch (selid) {
        case "sido":
          this.sidoOptions = data.regcodes.map((regcode) => ({
            code: regcode.code,
            name: regcode.name,
          }));
          break;
        case "gugun":
          this.gugunOptions = data.regcodes.map((regcode) => {
            const nameParts = regcode.name.split(" ");
            const name = nameParts.slice(1).join(" ");
            return { code: regcode.code, name };
          });
          break;
        case "dong":
          this.dongOptions = data.regcodes.map((regcode) => {
            const nameParts = regcode.name.split(" ");
            const name = nameParts.slice(-1).join(" ");
            return { code: regcode.code, name };
          });
          break;
      }
    },
  },
};
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
      <form class="signup-form">
        <div class="label-container">
          <label class="signup-label" for="signup-id">이름</label>
          <input class="signup-id" id="signup-id" placeholder="아이디" />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-nickname">닉네임</label>
          <div class="signup-nickname-container">
            <input class="signup-nickname" id="signup-nickname" placeholder="닉네임" />
            <button class="signup-nickname-confirm">중복 확인</button>
          </div>
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-nickname">이메일</label>
          <input class="signup-email" id="signup-email" placeholder="이메일" />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-pw">비밀번호</label>
          <input class="signup-pw" id="signup-pw" placeholder="비밀번호" />
        </div>
        <div class="label-container">
          <label class="signup-label" for="signup-pwconfirm">비밀번호 확인</label>
          <input class="signup-pwconfirm" id="signup-pwconfirm" placeholder="비밀번호 확인" />
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
            <select v-model="selectedDong" @change="onDongChange">
              <option value="">동 선택</option>
              <option v-for="dong in dongOptions" :key="dong.code" :value="dong">
                {{ dong.name }}
              </option>
            </select>
          </div>
        </div>
        <router-link to="/signup" class="signup-button">회원가입</router-link>
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
