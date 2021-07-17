import axios from 'axios';

const commonUrl = '/api/youtube';

const searchList = q => {
  return axios.post(`${commonUrl}/searchList`, { q });
};

const mostPopularVideoList = () => {
  return axios.get(`${commonUrl}/mostPopularVideoList`);
};

const recommendedList = category => {
  return axios.post(`${commonUrl}/recommendedList`, { category });
};

const searchListInVideo = id => {
  return axios.post(`${commonUrl}/searchListInVideo`, { id });
};

const infoChannel = ids => {
  return axios.post(`${commonUrl}/channelInfo`, { ids });
};

const commentList = id => {
  return axios.post(`${commonUrl}/commentList`, { id });
};

export { searchList, mostPopularVideoList, recommendedList, searchListInVideo, infoChannel, commentList };
