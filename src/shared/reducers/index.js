import { combineReducers } from 'redux';

const reducersContext = require.context('.', false, /^((?!index)(?!\.js).)*$/);
const reducers = reducersContext.keys().reduce((res, item) => {
  if (item.length > 2) {
    res[item.substr(2)] = reducersContext(item).default;
  }

  return res;
}, {});

const rootReducer = combineReducers(reducers);

export default rootReducer;
