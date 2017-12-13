import {
  SET_SUBMENU,
  SUB_MENU_TYPES,
  TOGGLE_MODAL,
  TOGGLE_AUTH_MODAL,
  SET_MAP_AS_ENTRY_POINT,
  TOGGLE_REQUEST_MODAL,
} from '../constants/AppConstants';

const initialState = {
  subMenuItem: SUB_MENU_TYPES.MAP,
  modal: {
    modalActive: false,
    modalType: null,
    showAuthModal: false,
    showRequestModal: false,
    requestModalView: 1,
    requestType: 'submitQuestion',
    analyticsType: 'MAP_CTA',
  },
  mapIsEntryPoint: false,
};

const app = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case SET_SUBMENU:
      return {
        ...state,
        subMenuItem: payload.subMenuItem,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalActive: payload.modalActive,
          modalType: payload.modalType,
        },
      };
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          showAuthModal: payload.showAuthModal,
        },
      };
    case SET_MAP_AS_ENTRY_POINT:
      return {
        ...state,
        mapIsEntryPoint: true,
      };
    case TOGGLE_REQUEST_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default app;
