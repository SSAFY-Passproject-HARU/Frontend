import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MypageView from "@/views/MypageView.vue";
import SignupView from "@/views/SignupView.vue";
import HouseRegisterView from "@/views/HouseRegisterView.vue";
import MapView from "../views/MapView.vue";
import HouseDetailView from "../views/HouseDetailView.vue";
import NewsView from "@/views/NewsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MypageView,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
    {
      path: '/house/detail/:aptSeq',
      name: 'housedetail',
      component: HouseDetailView,
    },
    {
      path: "/house/register",
      name: "HouseRegister",
      component: HouseRegisterView,
    },
  ],
});

export default router;
