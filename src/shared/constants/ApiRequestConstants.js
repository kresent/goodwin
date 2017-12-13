// const API_REQUEST_BASE_MOCK = 'https://fc1719b3-1f1f-43fb-b8ba-07362d71c7a3.mock.pstmn.io';

const protocol =
  process.env.CORDOVA === 'true'
    ? 'https://'
    : process.env.BUILD_FLAG_IS_SERVER === 'true' ? 'http://' : '//';

export const API_REQUEST_BASE_PROD = `${protocol}???.ru`;

const API_REQUEST_URL = `${API_REQUEST_BASE_PROD}/api/v2`;

// Запросить список квартир
export const API_FETCH_APARTMENTS = `${API_REQUEST_URL}/apartments`;

// Запросить список квартир с краткой информацией
export const API_FETCH_APARTMENTS_SMALL_FORM_LIST = `${API_REQUEST_URL}/apartments/smallFormList`;
