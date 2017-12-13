import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';

import {
  FILTERS_REQUEST,
  FILTERS_GOT,
  FILTERS_ERROR,
  FILTERS_UPDATE,
  FILTERS_REMOVE,
  FILTERS_REMOVE_ALL,
  FILTERS_INIT,
  FILTERS_APPLY,
} from '../constants/FiltersConstants';

/**
 * Проверяет, надо ли обновлять распределения
 *
 * @param {array} initiatedBy
 * @param {any} data
 * @returns
 */
function validateDistribution(initiatedBy, data) {
  if (initiatedBy.length === 1) {
    const initiator = initiatedBy[0];
    switch (initiator) {
      case 'price':
        delete data.priceSlots;
        break;
      case 'square':
        delete data.squareSlots;
        break;
      case 'kitchen':
        delete data.kitchenSquareSlots;
        break;
      default:
    }
  }

  return data;
}

/**
 * Определить, надо ли блокировать изменение распределения для иницирующего ежа
 *
 * @param {any} data
 * @param {any} state
 * @returns
 */
function getUpdateInitiator(data, state) {
  const initiator = typeof data === 'string' ? data : Object.keys(data)[0];
  const { currentFilters } = state;
  const initiatedBy = [...state.initiatedBy];

  // если Еж уменьшался, то блокируем изменение, иначе - нет
  if (
    !currentFilters[initiator] ||
    !['price', 'square', 'kitchen'].includes(initiator) ||
    (currentFilters[initiator].from < data[initiator].from ||
      currentFilters[initiator].to > data[initiator].to)
  ) {
    initiatedBy.push(initiator);
  }

  return initiatedBy;
}

function removeFilter(filter, state) {
  const currentFilters = { ...state.currentFilters };

  // e.g., 'rooms'
  if (typeof filter === 'string') {
    delete currentFilters[filter];
  } else if (typeof filter === 'object') {
    Object.keys(filter).forEach(key => {
      const filterValue = filter[key];
      // e.g., { rooms: [1, 2] }
      if (Array.isArray(filterValue)) {
        filterValue.forEach(item => {
          const itemIndex = currentFilters[key].indexOf(item);
          if (itemIndex !== -1) {
            if (currentFilters[key].length === 1) {
              // удалить свойство, если последний элемент
              delete currentFilters[key];
            } else {
              currentFilters[key].splice(itemIndex, 1);
            }
          }
        });

        // e.g., { to_underground: 'by_foot' }
      } else if (typeof filterValue === 'string') {
        delete currentFilters[key][filterValue];
      } else {
        // e.g., { location: true, map: true }
        delete currentFilters[key];
      }
    });
  }

  return currentFilters;
}

const initialState = {
  status: 'none',
  error: null,
  // временные фильтры, использующиеся в модалке "Фильтры"
  currentFilters: {},
  // примененные к выборке фильтры
  appliedFilters: {},
  // отличаются ли наборы фильтров
  currentEqualsApplied: true,
  initiatedBy: [],
  count: null,
  priceSlots: [],
  appliedPriceSlots: [],
  squareSlots: [],
  kitchenSquareSlots: [],
};

function filters(state = initialState, action) {
  switch (action.type) {
    case FILTERS_INIT: {
      const initialFilters = loadFromLocalStorage('ha.filters', true) || {};

      return {
        ...state,
        currentFilters: initialFilters,
        appliedFilters: initialFilters,
        currentEqualsApplied: true,
      };
    }

    case FILTERS_REQUEST:
      return {
        ...state,
        status: 'request',
      };

    case FILTERS_GOT: {
      const {
        initiatedBy,
        appliedPriceSlots,
        currentFilters,
        currentEqualsApplied,
      } = state;

      const newState = validateDistribution(initiatedBy, action.payload);
      const updatePriceSlots =
        newState.priceSlots &&
        (appliedPriceSlots.length === 0 ||
          Object.keys(currentFilters).length === 0 ||
          currentEqualsApplied);

      return {
        ...state,
        status: 'success',
        initiatedBy: [],
        ...newState,
        appliedPriceSlots: updatePriceSlots
          ? newState.priceSlots
          : appliedPriceSlots,
      };
    }

    case FILTERS_ERROR:
      return {
        ...state,
        status: 'error',
        initiatedBy: [],
        error: action.error,
      };

    case FILTERS_UPDATE: {
      if (!action.payload) return state;

      const data = action.payload;
      const currentFilters = { ...state.currentFilters };
      const initiatedBy = getUpdateInitiator(action.payload, state);

      if (data.map) delete currentFilters.underground;
      if (data.underground) delete currentFilters.map;

      if (
        data.location &&
        currentFilters[data.location] &&
        currentFilters[data.location].length === 0
      ) {
        delete currentFilters.location;
        delete data.location;
      }

      return {
        ...state,
        currentFilters: { ...currentFilters, ...data },
        initiatedBy,
        currentEqualsApplied: false,
      };
    }

    case FILTERS_REMOVE: {
      if (!action.payload) return state;
      const currentFilters = removeFilter(action.payload, state);

      return { ...state, currentFilters, currentEqualsApplied: false };
    }

    case FILTERS_REMOVE_ALL:
      return { ...state, currentFilters: {}, currentEqualsApplied: false };

    case FILTERS_APPLY:
      saveToLocalStorage('ha.filters', state.currentFilters, true);
      return {
        ...state,
        appliedFilters: state.currentFilters,
        appliedPriceSlots: state.priceSlots,
        currentEqualsApplied: true,
      };

    default:
      return state;
  }
}

export default filters;
