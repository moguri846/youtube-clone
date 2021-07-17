import {
  SET_SEARCH_LIST,
  SET_RECOMMENDED_LIST,
  SET_MOST_POPULAR_VIDEO_LIST,
  SET_SEARCH_LIST_IN_VIDEO,
  SET_COMMENT_LIST,
} from './type.js';
import {
  searchList,
  recommendedList,
  mostPopularVideoList,
  searchListInVideo,
  infoChannel,
  commentList,
} from '../API/index.js';

export default {
  async GET_SEARCH_LIST({ commit }, q) {
    try {
      const {
        data: { data },
      } = await searchList(q);

      const result = await channelInfo(data.items);

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

      const result = await channelInfo(data.items);

      commit(SET_MOST_POPULAR_VIDEO_LIST, result);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async GET_SEARCH_LIST_IN_VIDEO({ commit }, id) {
    try {
      const {
        data: { data },
      } = await searchListInVideo(id);

      const result = await channelInfo(data.items);

      commit(SET_SEARCH_LIST_IN_VIDEO, result[0]);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async GET_RECOMMENDED_LIST({ commit }, recommended) {
    try {
      const {
        data: { data },
      } = await recommendedList(recommended);

      const result = await channelInfo(data.items);

      commit(SET_RECOMMENDED_LIST, result);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async GET_COMMENT_LIST({ commit }, id) {
    try {
      const {
        data: { data },
      } = await commentList(id);
      commit(SET_COMMENT_LIST, data.items);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

const channelInfo = async data => {
  const channelIds = [];
  const result = [];

  // 채널 아이디 channelIds에 push
  await data.map((item, index) => {
    const channelId = item.snippet.channelId;
    channelIds.push({ channel: channelId, index });
  });

  // 채널 정보 요청
  const {
    data: { channel },
  } = await infoChannel(channelIds);

  // 데이터 합치기
  data.map((item, index) => {
    result.push({
      video: item,
      channel: channel[index].data.items[0],
    });
  });

  return result;
};
