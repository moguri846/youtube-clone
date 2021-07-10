import { SET_SEARCH_LIST, SET_CATEGORY_LIST, SET_MOST_POPULAR_VIDEO_LIST, SET_SEARCH_LIST_IN_VIDEO } from './type.js';
import { searchList, categoryList, mostPopularVideoList, searchListInVideo } from '../API/index.js';

export default {
  GET_SEARCH_LIST({ commit }, q) {
    return searchList(q)
      .then(({ data: { data } }) => {
        commit(SET_SEARCH_LIST, data.items);
        return data;
      })
      .catch(err => console.log(err));
  },
  GET_MOST_POPULAR_VIDEO_LIST({ commit }) {
    return mostPopularVideoList()
      .then(({ data: { data } }) => {
        commit(SET_MOST_POPULAR_VIDEO_LIST, data.items);
        return data;
      })
      .catch(err => console.log(err));
  },
  GET_SEARCH_LIST_IN_VIDEO({ commit }, id) {
    return searchListInVideo(id)
      .then(({ data: { data } }) => {
        commit(SET_SEARCH_LIST_IN_VIDEO, data.items[0]);
        return data;
      })
      .catch(err => console.log(err));
  },
  GET_CATEGORY_LIST({ commit }, category) {
    return categoryList(category)
      .then(({ data: { data } }) => {
        commit(SET_CATEGORY_LIST, data.items);
        return data;
      })
      .catch(err => console.log(err));
  },
};
