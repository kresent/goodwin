/* eslint-disable import/prefer-default-export */

import removeNil from './removeNil';

export { removeNil };

export const findRangeIndex = (value, array) => {
  if (value >= array[array.length - 1]) return array.length - 1;

  let arrIndex = 0;

  for (var i = 0; i < array.length; i++) {
    if (value < array[i]) {
      arrIndex = i - 1;
      break;
    }
  }

  return arrIndex >= 0 ? arrIndex : 0;
};
