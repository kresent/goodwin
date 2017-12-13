import Format from '../format';

describe('Format.timestampToDate', () => {
  let today;
  let todayTimeStamp;
  let yesterdayTimeStamp;

  beforeAll(() => {
    today = new Date();
    todayTimeStamp = Date.parse(today.toString());
    yesterdayTimeStamp = Date.parse(today.toString()) - 24 * 60 * 60 * 1000;
  });

  it('returns "Сегодня" for todayTimeStamp', () => {
    expect(Format.timestampToDate(todayTimeStamp)).toBe('Сегодня');
  });

  it('returns "вчера" for yesterdayTimeStamp', () => {
    expect(Format.timestampToDate(yesterdayTimeStamp)).toBe('Вчера');
  });

  it('returns "12 ноября 2016 г." for ', () => {
    expect(Format.timestampToDate(1478953342000)).toBe('12 ноября 2016 г.');
  });
});
