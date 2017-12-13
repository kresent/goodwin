import Format from '../format';

const mapPoints = [
  {
    name: 'Станция метро',
    time: '14',
    type: 'underground',
    coordinates: { latitude: '55.73950200', longitude: '37.65360500' },
    color: '943E90',
    description: 'Таганская',
  },
  {
    name: 'Школа',
    type: 'school',
    distance: 470.62551110683,
    coordinates: { latitude: '55.7439388', longitude: '37.6373792' },
    description: 'Школа №518',
  },
  {
    name: 'Школа',
    type: 'school',
    distance: 498.83312543366,
    coordinates: { latitude: '55.7437235', longitude: '37.6463345' },
    description: 'Школа №2104 на Таганке',
  },
  {
    name: 'Школа',
    type: 'school',
    distance: 503.26692237735,
    coordinates: { latitude: '55.7436516', longitude: '37.6371992' },
    description: 'Школа №518',
  },
  {
    name: 'Школа',
    type: 'school',
    distance: 605.84978921438,
    coordinates: { latitude: '55.7488656', longitude: '37.6510548' },
    description: 'Центр образования №1685',
  },
  {
    name: 'Школа',
    type: 'school',
    distance: 613.65438637156,
    coordinates: { latitude: '55.7523355', longitude: '37.6373925' },
    description: 'Школа №1650',
  },
  {
    name: 'Поликлиника',
    type: 'hospital',
    distance: 1041.0037873364,
    coordinates: { latitude: '55.7565511', longitude: '37.6383264' },
    description: 'НИЦ Профилактической медицины',
  },
  {
    name: 'Поликлиника',
    type: 'hospital',
    distance: 1325.3741503271,
    coordinates: { latitude: '55.7586405', longitude: '37.6487222' },
    description:
      'Московский областной научно-исследовательский институт акушерства и гинекологии',
  },
  {
    name: 'Поликлиника',
    type: 'hospital',
    distance: 1414.5510901471,
    coordinates: { latitude: '55.7577072', longitude: '37.6549566' },
    description:
      '574 военный клинический госпиталь Московского военного округа',
  },
  {
    name: 'Поликлиника',
    type: 'hospital',
    distance: 1499.9628713873,
    coordinates: { latitude: '55.7608172', longitude: '37.6394732' },
    description: 'НПЦ интервенционной кардиоангиологии',
  },
  {
    name: 'Поликлиника',
    type: 'hospital',
    distance: 1660.6025245958,
    coordinates: { latitude: '55.7325535', longitude: '37.6386774' },
    description: 'Филиал Городской клинической больницы №4',
  },
];

describe('formatPoints', () => {
  it('formats mapPoints', () => {
    expect(Format.mapPoints(mapPoints)).toEqual([
      {
        name: 'Станция метро',
        time: '14',
        type: 'underground',
        coordinates: { latitude: '55.73950200', longitude: '37.65360500' },
        color: '943E90',
        description: 'Таганская',
        additionalItems: [],
      },
      {
        name: 'Школа',
        type: 'school',
        distance: 470.62551110683,
        coordinates: { latitude: '55.7439388', longitude: '37.6373792' },
        description: 'Школа №518',
        additionalItems: [
          {
            name: 'Школа',
            type: 'school',
            distance: 498.83312543366,
            coordinates: { latitude: '55.7437235', longitude: '37.6463345' },
            description: 'Школа №2104 на Таганке',
          },
          {
            name: 'Школа',
            type: 'school',
            distance: 503.26692237735,
            coordinates: { latitude: '55.7436516', longitude: '37.6371992' },
            description: 'Школа №518',
          },
          {
            name: 'Школа',
            type: 'school',
            distance: 605.84978921438,
            coordinates: { latitude: '55.7488656', longitude: '37.6510548' },
            description: 'Центр образования №1685',
          },
          {
            name: 'Школа',
            type: 'school',
            distance: 613.65438637156,
            coordinates: { latitude: '55.7523355', longitude: '37.6373925' },
            description: 'Школа №1650',
          },
        ],
      },
      {
        name: 'Поликлиника',
        type: 'hospital',
        distance: 1041.0037873364,
        coordinates: { latitude: '55.7565511', longitude: '37.6383264' },
        description: 'НИЦ Профилактической медицины',
        additionalItems: [
          {
            name: 'Поликлиника',
            type: 'hospital',
            distance: 1325.3741503271,
            coordinates: { latitude: '55.7586405', longitude: '37.6487222' },
            description:
              'Московский областной научно-исследовательский институт акушерства и гинекологии',
          },
          {
            name: 'Поликлиника',
            type: 'hospital',
            distance: 1414.5510901471,
            coordinates: { latitude: '55.7577072', longitude: '37.6549566' },
            description:
              '574 военный клинический госпиталь Московского военного округа',
          },
          {
            name: 'Поликлиника',
            type: 'hospital',
            distance: 1499.9628713873,
            coordinates: { latitude: '55.7608172', longitude: '37.6394732' },
            description: 'НПЦ интервенционной кардиоангиологии',
          },
          {
            name: 'Поликлиника',
            type: 'hospital',
            distance: 1660.6025245958,
            coordinates: { latitude: '55.7325535', longitude: '37.6386774' },
            description: 'Филиал Городской клинической больницы №4',
          },
        ],
      },
    ]);
  });
});
