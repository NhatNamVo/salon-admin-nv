import { groupRoutes } from "@/helpers/contants/constants";
import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "dashboard",
    text: 'Home',
    group: groupRoutes.home,
    component: () => import("../pages/dashboard/dashboard-page.vue"),
    meta: {
      requiredAuth: true,
      layout: 'main-layout',
    },
  },
  {
    path: `/${groupRoutes.client}/client-list`,
    name: "client-list",
    text: 'Client List',
    group: groupRoutes.client,
    component: () => import("../pages/clients/client-list/client-list.vue"),
    meta: {
      requiredAuth: true,
      layout: 'main-layout',
    },
  },
  {
    path: `/${groupRoutes.client}/duplicated-clients`,
    name: "client-duplicated",
    text: 'Client Duplicated',
    group: groupRoutes.client,
    component: () => import("../pages/clients/client-list/client-list.vue"),
    meta: {
      requiredAuth: true,
      layout: 'main-layout',
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/login/login.vue"),
    meta: {
      requiredAuth: false,
      layout: 'default-layout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userLogged = getUserLogged();
    if (to.name === "login" && userLogged) {
      next({ name: "client-list" });
    }
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (!userLogged) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;
