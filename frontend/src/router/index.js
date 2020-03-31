import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: process.env.CORDOVA_PLATFORM ? "hash" : "history",
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
    if (auth.roles.includes(store.state.auth.user_role))
      next();
    else
      next({
        name: auth.redirect
      });
    next();
  } else {
    next();
  }
  // console.log(to, to.matched, auth);
});

export default router