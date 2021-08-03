export const SHOW_LOADER = 0;

export const initialState = {
  showLoader: false,
};

export const appReducer = (state, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, showLoader: action.payload };
  }
};
