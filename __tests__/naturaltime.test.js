import naturaltime from '../src/naturaltime';

describe('naturaltime', () => {
  it('should return time since or ago when two params are passed', () => {
    const testList = [
      [new Date(2007, 1, 17, 16, 30, 0), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 29, 31), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 29, 0), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 15, 30, 1), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 15, 30, 0), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 13, 31, 29), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 16, 13, 31, 29), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 16, 13, 30, 0), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 30, 30), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 30, 29), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 31, 0), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 16, 34, 35), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 17, 17, 30, 29), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 18, 16, 31, 29), new Date(2007, 1, 17, 16, 30, 0)],
      [new Date(2007, 1, 26, 18, 31, 29), new Date(2007, 1, 17, 16, 30, 0)],
    ];
    const resultList = [
      'now',
      '29 seconds ago',
      'a minute ago',
      '59 minutes ago',
      'an hour ago',
      '2 hours ago',
      '1 day, 2 hours ago',
      '1 day, 3 hours ago',
      '30 seconds from now',
      '29 seconds from now',
      'a minute from now',
      '4 minutes from now',
      'an hour from now',
      '1 day from now',
      '1 week, 2 days from now',
    ];

    testList.forEach((n, idx) => {
      expect(naturaltime(n[0], n[1])).toBe(resultList[idx]);
    });
  });
});

const Date = global.Date;
const mockDate = jest.fn(() => new Date(2007, 1, 17, 16, 30, 0));

describe('naturaltime', () => {
  beforeAll(() => {
    global.Date = mockDate;
  });

  afterAll(() => {
    global.Date = Date;
  });

  it('should return time since or ago when current time is not passed', () => {
    const testList = [
      new Date(2007, 1, 17, 16, 30, 0),
      new Date(2007, 1, 17, 16, 25, 35),
      new Date(2007, 1, 17, 18, 31, 29),
    ];

    const resultList = ['now', '4 minutes ago', '2 hours from now'];
    testList.forEach((n, idx) => {
      console.log(`${n} <== n ==>  ${idx}`);

      expect(naturaltime(n)).toBe(resultList[idx]);
    });
  });
});

// Test examples were copied from https://docs.djangoproject.com/en/3.0/ref/contrib/humanize/#naturaltime
//  (when ‘now’ is 17 Feb 2007 16:30:00):

// 17 Feb 2007 16:30:00 becomes now.
// [new Date(2007, 1, 17, 16, 30, 0), new Date(2007, 1, 17, 16, 30, 0) ]

// 17 Feb 2007 16:29:31 becomes 29 seconds ago.
// [new Date(2007, 1, 17, 16, 29, 31), new Date(2007, 1, 17, 16, 30, 0)]

// 17 Feb 2007 16:29:00 becomes a minute ago.
// [new Date(2007, 1, 17, 16, 29, 0), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 16:25:35 becomes 4 minutes ago.
// [new Date(2007, 1, 17, 16, 25, 35), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 15:30:29 becomes 59 minutes ago.
// [new Date(2007, 1, 17, 15, 30, 01), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 15:30:00 becomes an hour ago.
// [new Date(2007, 1, 17, 15, 30, 0), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 13:31:29 becomes 2 hours ago.
// [new Date(2007, 1, 17, 13, 31, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 16 Feb 2007 13:31:29 becomes 1 day, 2 hours ago.
// [new Date(2007, 1, 16, 13, 31, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 16 Feb 2007 13:30:01 becomes 1 day, 2 hours ago.
// [new Date(2007, 1, 16, 13, 30, 1), new Date(2007, 1, 17, 16, 30, 0), ]

// 16 Feb 2007 13:30:00 becomes 1 day, 3 hours ago.
// [new Date(2007, 1, 16, 13, 30, 0), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 16:30:30 becomes 30 seconds from now.
// [new Date(2007, 1, 17, 16, 30, 30), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 16:30:29 becomes 29 seconds from now.
// [new Date(2007, 1, 17, 16, 30, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 16:31:00 becomes a minute from now.
// [new Date(2007, 1, 17, 16, 31, 00), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 16:34:35 becomes 4 minutes from now.
// [new Date(2007, 1, 17, 16, 34, 35), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 17:30:29 becomes an hour from now.
// [new Date(2007, 1, 17, 17, 30, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 17 Feb 2007 18:31:29 becomes 2 hours from now.
// [new Date(2007, 1, 17, 18, 31, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 18 Feb 2007 16:31:29 becomes 1 day from now.
// [new Date(2007, 1, 18, 16, 31, 29), new Date(2007, 1, 17, 16, 30, 0), ]

// 26 Feb 2007 18:31:29 becomes 1 week, 2 days from now
// [new Date(2007, 1, 26, 18, 31, 29), new Date(2007, 1, 17, 16, 30, 0), ]
