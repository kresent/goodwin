import { orderArrayByDate, trimTimestamp } from '../format';

describe('Format.trimDate', () => {
  it('should trim date', () => {
    expect(trimTimestamp(1508804200)).toBe(1508803200000);
  });
});

describe('Format.orderArrayByDate', () => {
  let today;
  let todayTimeStamp;
  let yesterdayTimeStamp;
  let data = [];

  const apartment = {
    id: '1100400820',
    pic:
      '/temp_storage/11/00/40/08/1100400820/modified/thumb_450x300_9aa7c5b1508caa6fd029a87c58ac2b23.jpg',
    address: 'Феодосийская улица,  1с9',
    price: 8.7,
    priceCurrency: 11,
    numOfRooms: '2',
    square: '69.0',
    isRecommended: '0',
    isModerated: '0',
    isSpecialOffer: '0',
    commissionAgentSum: null,
    minCommission: null,
    hasOwner: null,
    active: '1',
    capRateInfo: { capRate: null, minRent: null, maxRent: null },
    exposure_time: 397930,
    is_new_building: false,
    // date: 1508454113,
    pics:
      '/temp_storage/11/00/40/08/1100400820/modified/thumb_450x300_e6531a08abe7a3f9521fc7b6cf8257ff.jpg',
  };

  beforeAll(() => {
    today = new Date();
    todayTimeStamp = Date.parse(today.toString()) / 1000;
    yesterdayTimeStamp = Date.parse(today.toString()) / 1000 - 24 * 60 * 60;
    data.push({
      apartment: {
        ...apartment,
        dateCreated: todayTimeStamp,
      },
      isViewed: 0,
    });

    data.push({
      apartment: {
        ...apartment,
        dateCreated: todayTimeStamp,
      },
      isViewed: 0,
    });

    data.push({
      apartment: {
        ...apartment,
        dateCreated: yesterdayTimeStamp,
      },
      isViewed: 0,
    });

    data.push({
      apartment: {
        ...apartment,
        dateCreated: yesterdayTimeStamp,
      },
      isViewed: 0,
    });

    data.push({
      apartment: {
        ...apartment,
        dateCreated: yesterdayTimeStamp,
      },
      isViewed: 0,
    });
  });

  it('should return object', () => {
    expect(orderArrayByDate(data)).toEqual([
      {
        timestamp: trimTimestamp(todayTimeStamp),
        amount: 2,
      },
      {
        apartment: {
          ...apartment,
          dateCreated: todayTimeStamp,
        },
        isViewed: 0,
      },
      {
        apartment: {
          ...apartment,
          dateCreated: todayTimeStamp,
        },
        isViewed: 0,
      },
      {
        timestamp: trimTimestamp(yesterdayTimeStamp),
        amount: 3,
      },
      {
        apartment: {
          ...apartment,
          dateCreated: yesterdayTimeStamp,
        },
        isViewed: 0,
      },
      {
        apartment: {
          ...apartment,
          dateCreated: yesterdayTimeStamp,
        },
        isViewed: 0,
      },
      {
        apartment: {
          ...apartment,
          dateCreated: yesterdayTimeStamp,
        },
        isViewed: 0,
      },
    ]);
  });
});
