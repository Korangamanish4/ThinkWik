const INITIAL_STATE = {
    userDetail: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVE_USER_DETAIL":
           return {
             ...state,
             userDetail : action.payload
           };

         default: return state;
    }
};

export default userReducer;