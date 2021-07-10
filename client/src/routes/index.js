import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MainView from '../Views/MainView.vue';
import SearchListView from '../Views/SearchListView.vue';
import WatchVideoView from '../Views/WatchVideoView.vue';

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
      props: true,
    },
  ],
});
