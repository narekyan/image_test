const initialState = {
  images: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_IMAGES':
      return {
        ...state,
        images: action.images,
      };
    default:
      return state;
  }
};

export default reducer;