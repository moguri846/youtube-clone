import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions.js';
import mutations from './mutations.js';

export const store = new Vuex.Store({
  state: {
    searchList: [],
    mostPopularList: [],
    searchListInVideo: [],
    categoryList: [],
  },
  actions,
  mutations,
});
