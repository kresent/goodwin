import Format from '../format';

describe('formatPoints', () => {
  it('return Станция метро', () => {
    expect(Format.mapPointName('underground')).toEqual('Станция метро');
  });

  it('return Станции метро', () => {
    expect(Format.mapPointName('underground', true)).toEqual('Станции метро');
  });
});
