const initialState = {
    userId: null,
    userName: "",
    userEmail: "",

};
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MAIN_REDUCER': {
            return {
                ...state,
                ...action.payload
            }
        };
    default:
        return state;
    }
}