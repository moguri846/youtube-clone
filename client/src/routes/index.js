import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MainView from '../views/MainView.vue';
import SearchListView from '../views/SearchListView.vue';
import WatchVideoView from '../views/WatchVideoView.vue';

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/search_query=:value',
      name: 'search',
      component: SearchListView,
    },
    {
      path: '/watch',
      name: 'watch',
      component: WatchVideoView,
    },
  ],
});
