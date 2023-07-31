import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from "@/stores/TokenStore";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "TheContainer",
      component: () => import('@/container/theContainer/TheContainer.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/device',
          name: 'Device',
          children: [
            {
              path: "create",
              name: "CreateDevice",
              component: () => import("@/views/device/create/Create.vue")
            },
            {
              path: "list",
              name: "ListDevice",
              alias: ['/device', '/dashboard'],
              component: () => import("@/views/device/list/List.vue")
            },
            {
              path: "detail/:id",
              name: "DetailDevice",
              component: () => import("@/views/device/detail/Detail.vue")
            }
          ]
        },
        {
          path: '/sensor',
          name: 'Sensor',
          children: [
            {
              path: "create",
              name: "CreateSensor",
              alias: ['/sensor'],
              component: () => import("@/views/sensor/create/Create.vue")
            },
            {
              path: 'detail/:id',
              name: 'InformationSensor',
              component: () => import("@/views/sensor/detail/Detail.vue"),
            },
            {
              path: "list",
              name: "ListSensor",
              component: () => import("@/views/sensor/list/List.vue")
            },
          ]
        },
        {
          path: '/determined-value',
          name: 'DetermindedValue',
          children: [
            {
              path: 'list/:id',
              name: 'DetermindedValueList',
              component: () => import("@/views/determinedValue/list/List.vue"),
            },
          ]
        },

        {
          path: '/user',
          name: 'User',
          children: [
            {
              path: "create",
              name: "CreateUser",
              component: () => import("@/views/user/create/Create.vue")
            },
            {
              path: "list",
              name: "ListUser",
              alias: ['/user'],
              component: () => import("@/views/user/list/List.vue")
            },
          ]
        },
      ]
    },
    {
      path: "/",
      name: "Authentication",
      children: [
        {
          path: "login",
          name: "Login",
          alias: ['/'],
          component: () => import("@/views/authentication/login/Login.vue")
        },
      ]
    }
  ]
})

router.beforeEach((to) => {
  const token_store = useTokenStore();
  if (to.meta.requiresAuth && !token_store.isValidated) {
    return "/login";
  }
  return;
});


export default router
