import axios from 'axios';

const PIXABAY_API_KEY = '31882818-9540354c95a4ce9ab03cac674'

export const searchImages = (query, page) => {

  return (dispatch) => {
    axios
      .get(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&page=${page}&image_type=photo`
      )
      .then((response) => {
//        const oldImages = getState().reducer.images;

        dispatch({
          type: 'SEARCH_IMAGES',
          images: response.data.hits,
        });
      });
  };
};