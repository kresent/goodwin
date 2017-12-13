import Format from '../format';

describe('Format.money', () => {
  it('returns 5 000 000 р.', () => {
    expect(
      Format.money(5, {
        scale: 1000000,
        currency: 11,
      })
    ).toEqual('5 000 000 р.');
  });

  it('returns 135 714 р.', () => {
    expect(
      Format.money(135714.28571429, {
        currency: 11,
      })
    ).toEqual('135 714 р.');
  });
});

describe('Format.wordEnding', () => {
  it('returns "минут" for 0', () => {
    expect(Format.wordEnding(0, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 1', () => {
    expect(Format.wordEnding(1, ['минута', 'минуты', 'минут'])).toEqual(
      'минута'
    );
  });

  it('returns "минут" for 2', () => {
    expect(Format.wordEnding(2, ['минута', 'минуты', 'минут'])).toEqual(
      'минуты'
    );
  });

  it('returns "минут" for 3', () => {
    expect(Format.wordEnding(3, ['минута', 'минуты', 'минут'])).toEqual(
      'минуты'
    );
  });

  it('returns "минут" for 4', () => {
    expect(Format.wordEnding(4, ['минута', 'минуты', 'минут'])).toEqual(
      'минуты'
    );
  });

  it('returns "минут" for 5', () => {
    expect(Format.wordEnding(5, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 6', () => {
    expect(Format.wordEnding(6, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 7', () => {
    expect(Format.wordEnding(7, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 8', () => {
    expect(Format.wordEnding(8, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 9', () => {
    expect(Format.wordEnding(9, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 10', () => {
    expect(Format.wordEnding(10, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 14543', () => {
    expect(Format.wordEnding(14543, ['минута', 'минуты', 'минут'])).toEqual(
      'минуты'
    );
  });

  it('returns "минут" for 14511', () => {
    expect(Format.wordEnding(14511, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 14512', () => {
    expect(Format.wordEnding(14512, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 14513', () => {
    expect(Format.wordEnding(14513, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });

  it('returns "минут" for 14511', () => {
    expect(Format.wordEnding(14514, ['минута', 'минуты', 'минут'])).toEqual(
      'минут'
    );
  });
});
