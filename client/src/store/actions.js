import {
  SET_SEARCH_LIST,
  SET_RECOMMENDED_LIST,
  SET_MOST_POPULAR_VIDEO_LIST,
  SET_SEARCH_LIST_IN_VIDEO,
} from './type.js';
import { searchList, recommendedList, mostPopularVideoList, searchListInVideo, infoChannel } from '../API/index.js';

export default {
  async GET_SEARCH_LIST({ commit }, q) {
    try {
      const {
        data: { data },
      } = await searchList(q);

      const result = await channelInf(data.items);

      commit(SET_SEARCH_LIST, result);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async GET_MOST_POPULAR_VIDEO_LIST({ commit }) {
    try {
      const {
        data: { data },
      } = await mostPopularVideoList();

      const result = await channelInf(data.items);

      commit(SET_MOST_POPULAR_VIDEO_LIST, result);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  GET_SEARCH_LIST_IN_VIDEO({ commit }, id) {
    return searchListInVideo(id)
      .then(({ data: { data } }) => {
        commit(SET_SEARCH_LIST_IN_VIDEO, data.items[0]);
        return data;
      })
      .catch(err => console.log(err));
  },
  async GET_RECOMMENDED_LIST({ commit }, recommended) {
    try {
      const {
        data: { data },
      } = await recommendedList(recommended);

      const result = await channelInf(data.items);

      commit(SET_RECOMMENDED_LIST, result);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

const channelInf = async data => {
  const channelIds = [];
  const result = [];

  // 채널 아이디 channelIds에 push
  await data.map(item => {
    const channelId = item.snippet.channelId;
    channelIds.push({ channel: channelId });
  });

  // 채널 정보 요청
  const {
    data: { channel },
  } = await infoChannel(channelIds);

  // 데이터 합치기
  data.map((item, index) => {
    result.push({
      ...item,
      channel: channel[index].items[0],
    });
  });

  return result;
};
