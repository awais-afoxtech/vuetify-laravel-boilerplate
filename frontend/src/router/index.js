import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'
import helpers from '@/utils/helpers'

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  const nearestWithAuth = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.auth);
  if (nearestWithAuth)
    var auth = nearestWithAuth.meta.auth;

  if (auth) {
    if (auth.roles.includes(eval(store.state.auth.user_role)))
      next();
    else
      next({
        name: helpers.getRoleHome(store.state.auth.user_role)
      });
  } else {
    next();
  }
});

export default router