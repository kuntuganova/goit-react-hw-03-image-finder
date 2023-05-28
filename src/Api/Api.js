const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35190639-3a7acd02227a3d19c5cf9cfef';

const API = async (searchQuery, page) => {
  try {
    const response = await fetch(`
  ${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while making the API request.');
  }
};
export default API;
