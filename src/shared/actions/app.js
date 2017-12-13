import {
  SET_SUBMENU,
  TOGGLE_MODAL,
  TOGGLE_AUTH_MODAL,
  SET_MAP_AS_ENTRY_POINT,
  TOGGLE_REQUEST_MODAL,
} from '../constants/AppConstants';

export const setSubMenu = subMenuItem => dispatch => {
  dispatch({
    type: SET_SUBMENU,
    payload: {
      subMenuItem,
    },
  });
};

export const openModal = modalType => dispatch => {
  // todo 1 add setTimeout

  dispatch({
    type: TOGGLE_MODAL,
    payload: {
      modalActive: true,
      modalType,
    },
  });
};

export const closeModal = () => dispatch => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: {
      modalActive: false,
      modalType: null,
    },
  });
};

export const openAuthModal = () => dispatch => {
  dispatch({
    type: TOGGLE_AUTH_MODAL,
    payload: {
      showAuthModal: true,
    },
  });
};

export const closeAuthModal = () => dispatch => {
  dispatch({
    type: TOGGLE_AUTH_MODAL,
    payload: {
      showAuthModal: false,
    },
  });
};

export const setRequestModal = params => dispatch => {
  dispatch({
    type: TOGGLE_REQUEST_MODAL,
    payload: {
      ...params,
    },
  });
};

export const setMapAsEntryPoint = () => dispatch => {
  dispatch({
    type: SET_MAP_AS_ENTRY_POINT,
  });
};
