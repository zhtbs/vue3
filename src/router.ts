import { createRouter, createWebHistory } from "vue-router";
import login from "./page/login.vue";
import Layout from "./page/layout.vue";
import { useLoginStore } from "@/stores/LoginStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: login
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/Layout",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "/userlist",
          name: "userlist",
          component: () => import("./page/sys/userlist.vue")
        },
        {
          path: "/userlistb",
          name: "userlistb",
          component: () => import("./page/sys/user2.vue")
        },
        {
          path: "/userlistc",
          name: "userlistc",
          component: () => import("./page/sys/user3.vue")
        },
        {
          path: "/tankPlan",
          name: "tankPlan",
          component: () => import("./page/tank/tankPlan.vue")
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  const user = useLoginStore();
  // if(to.fullPath!='/login'){
  //   if(user.getToken==''){
  //     next('/login');
  //   }else{
  //     next();
  //   }
  // }else{
  //   next();
  // }
  next();
});
export default router;
