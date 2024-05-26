import axios from 'axios';
const API_KEY = '24251933-9d29857377778e751e7f0d7a1';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

axios.defaults.baseURL = BASE_URL;

export const fetchPhotosByQuery = async (query, photosCurrentPage = 1) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: PER_PAGE,
      page: photosCurrentPage,
    },
  });

  return response.data;
};