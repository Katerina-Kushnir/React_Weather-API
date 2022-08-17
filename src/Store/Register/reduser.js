import { SET_IS_REGISTERED_ACTION } from "./action";
import { UPDATE_USER_MODAL_ACTION } from "./action";

const initialState = {
    isRegistered: false,
    user: [],
}

export const registerReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_REGISTERED_ACTION:
            return {
                ...state,
                isRegistered: action.isRegistered,
            }
        case UPDATE_USER_MODAL_ACTION:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.userModal,
                }
            }
        default:
            return state;
    }
}