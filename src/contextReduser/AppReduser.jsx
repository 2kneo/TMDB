export const SHOW_LOADER = 0;
export const LANGUAGE = 1;

export const initialState = {
  showLoader: false,
  language: localStorage.getItem("language") || "ru",
};

export const appReducer = (state, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, showLoader: action.payload };
    case LANGUAGE:
      return { ...state, language: action.payload };
  }
};
