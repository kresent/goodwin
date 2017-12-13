import Format from '../format';

describe('Format.camelCasePropNamesFormatter', () => {
  it('works then empty object is passed', () => {
    expect(Format.camelCasePropNamesFormatter({})).toEqual({});
  });

  it('works then empty object is passed and recursive flag is true', () => {
    expect(Format.camelCasePropNamesFormatter({}, true)).toEqual({});
  });

  it('works then non-empty object is passed', () => {
    expect(
      Format.camelCasePropNamesFormatter({ foo_bar: 'awesome_value' })
    ).toEqual({
      fooBar: 'awesome_value',
    });
  });

  it('works then object with several properties is passed', () => {
    expect(
      Format.camelCasePropNamesFormatter({
        foo_bar_one: 'awesome_value_one',
        foo_bar_two: 'awesome_value_two',
      })
    ).toEqual({
      fooBarOne: 'awesome_value_one',
      fooBarTwo: 'awesome_value_two',
    });
  });

  it('does not go inside nested object if flag is false', () => {
    expect(
      Format.camelCasePropNamesFormatter({
        foo_bar_one: 'awesome_value_one',
        foo_bar_two: 'awesome_value_two',
        nested_object: {
          foo_bar_one: 'awesome_value_one',
          foo_bar_two: 'awesome_value_two',
        },
      })
    ).toEqual({
      fooBarOne: 'awesome_value_one',
      fooBarTwo: 'awesome_value_two',
      nestedObject: {
        foo_bar_one: 'awesome_value_one',
        foo_bar_two: 'awesome_value_two',
      },
    });
  });

  it('goes inside nested object if flag is false', () => {
    expect(
      Format.camelCasePropNamesFormatter(
        {
          foo_bar_one: 'awesome_value_one',
          foo_bar_two: 'awesome_value_two',
          nested_object: {
            foo_bar_one: 'awesome_value_one',
            foo_bar_two: 'awesome_value_two',
          },
        },
        true
      )
    ).toEqual({
      fooBarOne: 'awesome_value_one',
      fooBarTwo: 'awesome_value_two',
      nestedObject: {
        fooBarOne: 'awesome_value_one',
        fooBarTwo: 'awesome_value_two',
      },
    });
  });

  it('goes inside nested object with array of objects if flag is false', () => {
    expect(
      Format.camelCasePropNamesFormatter(
        {
          foo_bar_one: 'awesome_value_one',
          foo_bar_two: 'awesome_value_two',
          nested_array_object: [
            {
              foo_bar_one: 'awesome_value_one',
              foo_bar_two: 'awesome_value_two',
            },
            {
              foo_bar_one: 'awesome_value_one',
              foo_bar_two: 'awesome_value_two',
            },
            'test',
          ],
        },
        true
      )
    ).toEqual({
      fooBarOne: 'awesome_value_one',
      fooBarTwo: 'awesome_value_two',
      nestedArrayObject: [
        {
          fooBarOne: 'awesome_value_one',
          fooBarTwo: 'awesome_value_two',
        },
        {
          fooBarOne: 'awesome_value_one',
          fooBarTwo: 'awesome_value_two',
        },
        'test',
      ],
    });
  });

  it('works with array if flag is false', () => {
    expect(
      Format.camelCasePropNamesFormatter(
        [
          {
            foo_bar_one: 'awesome_value_one',
            foo_bar_two: 'awesome_value_two',
          },
          {
            foo_bar_one: 'awesome_value_one',
            foo_bar_two: 'awesome_value_two',
          },
          'test',
        ],
        true
      )
    ).toEqual([
      {
        fooBarOne: 'awesome_value_one',
        fooBarTwo: 'awesome_value_two',
      },
      {
        fooBarOne: 'awesome_value_one',
        fooBarTwo: 'awesome_value_two',
      },
      'test',
    ]);
  });
});
