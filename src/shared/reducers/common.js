import {
  COMMON_CTA_REQUEST,
  COMMON_CTA_GOT,
  COMMON_CTA_ERROR,
  COMMON_CTA_RESET,
  FEEDBACK_REQUEST,
  FEEDBACK_GOT,
  FEEDBACK_ERROR,
  FEEDBACK_RESET,
} from '../constants/CommonRequestConstants';

const initialState = {
  ctaStatus: null,
  ctaError: null,
  feedBackStatus: null,
  feedBackError: null,
};

function common(state = initialState, action) {
  switch (action.type) {
    case COMMON_CTA_REQUEST:
      return {
        ...state,
        ctaStatus: 'request',
      };

    case COMMON_CTA_GOT:
      return {
        ...state,
        ctaStatus: 'success',
      };

    case COMMON_CTA_ERROR:
      return {
        ...state,
        ctaStatus: 'error',
        ctaError: action.error,
      };

    case COMMON_CTA_RESET:
      return {
        ...state,
        ctaStatus: null,
        ctaError: null,
      };

    case FEEDBACK_REQUEST:
      return {
        ...state,
        feedBackStatus: 'request',
      };

    case FEEDBACK_GOT:
      return {
        ...state,
        feedBackStatus: 'success',
      };

    case FEEDBACK_ERROR:
      return {
        ...state,
        feedBackStatus: 'error',
        feedBackError: action.error,
      };

    case FEEDBACK_RESET:
      return {
        ...state,
        feedBackStatus: null,
        feedBackError: null,
      };

    default:
      return state;
  }
}

export default common;
