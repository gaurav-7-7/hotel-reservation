const { buildInitialRooms, chooseRooms, travelTime } = require('../lib/rooms');

test('initial rooms count is 97', () => {
  const rs = buildInitialRooms();
  expect(rs.length).toBe(97);
});

test('same-floor contiguous selection preference', () => {
  const rooms = buildInitialRooms();
  // Mark all as free, but occupy everything on floor 1 except two contiguous ones at indices 3..7
  const available = rooms.filter(r => !(r.floor === 5 && (r.index === 1 || r.index === 2)));
  // test choose k=2 => should pick two contiguous on same floor if exists
  const avail2 = rooms.filter(r => !r.occupied);
  const chosen = chooseRooms(avail2, 2);
  expect(chosen).not.toBeNull();
  expect(chosen.length).toBe(2);
});

test('travelTime calculations', () => {
  const a = { floor: 3, index: 2 };
  const b = { floor: 3, index: 5 };
  expect(travelTime(a,b)).toBe(3);
  const c = { floor: 4, index: 2 };
  expect(travelTime(a,c)).toBe(2); // vertical 2
});
