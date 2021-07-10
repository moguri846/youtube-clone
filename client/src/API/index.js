import axios from 'axios';

const commonUrl = '/api/youtube';

const searchList = q => {
  return axios.post(`${commonUrl}/searchList`, { q });
};

const mostPopularVideoList = () => {
  return axios.get(`${commonUrl}/mostPopularVideoList`);
};

const categoryList = category => {
  return axios.post(`${commonUrl}/categoryList`, { category });
};

const searchListInVideo = id => {
  return axios.post(`${commonUrl}/searchListInVideo`, { id });
};

export { searchList, mostPopularVideoList, categoryList, searchListInVideo };
