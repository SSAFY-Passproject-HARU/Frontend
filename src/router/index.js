import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MypageView from "@/views/MypageView.vue";
import SignupView from "@/views/SignupView.vue";
import MapView from "../views/MapView.vue";
import HouseDetailView from "../views/HouseDetailView.vue";
import NewsView from "@/views/NewsView.vue";
import LandingView from "@/views/LandingView.vue";
import RoomRegisterView from "@/views/RoomRegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/landing",
      name: "landing",
      component: LandingView,
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
      path: "/room/register/:aptSeq",
      name: "RoomRegister",
      component: RoomRegisterView,
    },
  ],
});

export default router;
