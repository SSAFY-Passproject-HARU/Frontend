import { reactive } from "vue";
import { defineStore } from "pinia";
import { userAxios } from "@/utils/http-commons";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const userHttp = userAxios();
  const router = useRouter();

  // 사용자 정보 상태 정의
  const user = reactive({
    id: "",
    password: "",
    name: "",
    nickname: "",
    email: "",
    sido: "",
    gugun: "",
    dong: "",
    role: "",
  });

  // 로그인
  function login(id, password) {
    userHttp
      .post("/login", { id, password })
      .then(() => {
        getUserData(); // 로그인 후 사용자 데이터 로드
      })
      .catch((err) => {
        console.error(err);
        alert("로그인 실패! 아이디와 비밀번호를 확인해주세요.");
      });
  }

  // 사용자 데이터 가져오기
  function getUserData() {
    userHttp
      .get("")
      .then((res) => {
        Object.assign(user, res.data); // 서버에서 받은 데이터를 상태에 반영
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 로그아웃
  function logout() {
    userHttp
      .delete("/logout")
      .then(() => {
        Object.keys(user).forEach((key) => (user[key] = "")); // 사용자 상태 초기화
        alert("로그아웃되었습니다. 감사합니다.");
        router.push("/"); // 홈 화면으로 이동
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 회원가입
  function register(userData) {
    userHttp
      .post("", userData)
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        router.push("/login"); // 회원가입 후 로그인 페이지로 이동
      })
      .catch((err) => {
        console.error(err);
        alert("회원가입 중 오류가 발생했습니다2.");
      });
  }

  // 사용자 정보 업데이트
  function updateUser(updatedData) {
    userHttp
      .put("", updatedData)
      .then(() => {
        alert("사용자 정보가 업데이트되었습니다.");
        getUserData(); // 업데이트 후 최신 데이터 로드
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 사용자 삭제
  function deleteUser() {
    userHttp
      .delete("")
      .then(() => {
        Object.keys(user).forEach((key) => (user[key] = "")); // 사용자 상태 초기화
        alert("사용자 계정이 삭제되었습니다.");
        router.push("/"); // 홈 화면으로 이동
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // 비밀번호 재설정
  function resetPassword(name, email, id, newPassword) {
    userHttp
      .put("/passwordReset", { name, email, id, password: newPassword })
      .then(() => {
        alert("비밀번호가 재설정되었습니다.");
      })
      .catch((err) => {
        console.error(err);
        alert("비밀번호 재설정에 실패했습니다.");
      });
  }

  return {
    user,
    login,
    logout,
    register,
    getUserData,
    updateUser,
    deleteUser,
    resetPassword,
  };
});
