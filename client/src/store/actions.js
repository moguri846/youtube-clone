import {
  SET_SEARCH_LIST,
  SET_RECOMMENDED_LIST,
  SET_MOST_POPULAR_VIDEO_LIST,
  SET_SEARCH_LIST_IN_VIDEO,
} from './type.js';
import { searchList, recommendedList, mostPopularVideoList, searchListInVideo } from '../API/index.js';

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
  GET_RECOMMENDED_LIST({ commit }, recommended) {
    return recommendedList(recommended)
      .then(({ data: { data } }) => {
        commit(SET_RECOMMENDED_LIST, data.items);
        return data;
      })
      .catch(err => console.log(err));
  },
};
