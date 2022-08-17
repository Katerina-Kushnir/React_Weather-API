export const SET_IS_REGISTERED_ACTION = 'SET_IS_REGISTERED_ACTION';
export const UPDATE_USER_MODAL_ACTION = 'UPDATE_USER_MODAL_ACTION';

export const setIsRegistered = (isRegistered) => {
    return {
        type: SET_IS_REGISTERED_ACTION,
        isRegistered,
    }
}

export const updateUserModalAction = (userModal) => {
    return {
        type: UPDATE_USER_MODAL_ACTION,
        userModal,
    }
}