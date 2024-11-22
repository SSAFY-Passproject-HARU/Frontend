import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MypageView from "@/views/MypageView.vue";
import SignupView from "@/views/SignupView.vue";
import HouseRegisterView from "@/views/HouseRegisterView.vue";

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
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/MapView.vue"),
    },
    {
      path: '/house/detail/:aptSeq',
      name: 'housedetail',
      component: () => import('../views/HouseDetailView.vue'),
    },
    {
      path: "/mypage",
      name: "Mypage",
      component: MypageView,
    },
    {
      path: "/house/register",
      name: "HouseRegister",
      component: HouseRegisterView,
    },
  ],
});

export default router;
