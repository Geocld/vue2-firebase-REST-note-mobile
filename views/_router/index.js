import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['../home/home'], resolve)
      }
    },
    {
      path: '/note/:key',
      name: 'note_detail',
      component: function (resolve) {
        require(['../note_detail/note_detail'], resolve)
      }
    }
  ]
});
