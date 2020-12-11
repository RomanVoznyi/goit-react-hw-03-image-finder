import axios from 'axios';

const KEY = '18895827-cf969cabaa6d7255b0d8616bb';

const fetchImage = async (searchQuery, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data;
};

export default fetchImage;
