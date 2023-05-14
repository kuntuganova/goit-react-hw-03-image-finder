const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35190639-3a7acd02227a3d19c5cf9cfef';

const API = (searchQuery, page) => {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then(res => res.json());
};

export default API;
