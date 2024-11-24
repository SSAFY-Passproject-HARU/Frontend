const { userAxios } = require("@/utils/http-commons");
const { defineStore } = require("pinia");
const { useRouter } = require("vue-router");

const router = useRouter();

const useUserStore = defineStore("user", () => {
  const userHttp = userAxios();

  // const user = reactive({
  //   id: "",
  //   name: "",
  //   email: "",
  // });

  function login(id, pw) {
    
  }
})