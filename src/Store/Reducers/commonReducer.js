const INITIAL_STATE = {
    showLoader: false,
  };
  
  const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SHOW_LOADER":
        return {
          ...state,
          showLoader: true,
        };
  
      case "HIDE_LOADER":
        return {
          ...state,
          showLoader: false,
        };
  
      default:
        return state;
    }
  };
  
  export default commonReducer;