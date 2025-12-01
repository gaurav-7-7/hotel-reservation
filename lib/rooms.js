// import { nanoid } from "nanoid";

// build initial rooms array (97 rooms)
function buildInitialRooms() {
  const rooms = [];
  for (let floor = 1; floor <= 9; floor++) {
    for (let idx = 1; idx <= 10; idx++) {
      const id = `${floor}${String(idx).padStart(2,"0")}`; // 101..110
      rooms.push({ id, floor, index: idx, occupied: false, bookingId: null });
    }
  }
  for (let idx = 1; idx <= 7; idx++) {
    const id = `100${idx}`; // 1001..1007
    rooms.push({ id, floor: 10, index: idx, occupied: false, bookingId: null });
  }
  return rooms;
}

// travel time: horizontal 1 per index diff, vertical 2 per floor diff
function travelTime(a, b) {
  return Math.abs(a.index - b.index) * 1 + Math.abs(a.floor - b.floor) * 2;
}

// chooseRooms O(N log N + N × k²)
function chooseRooms(availableRooms, k) {
  if (k < 1 || k > 5) throw new Error("k must be 1..5");

  const byFloor = {};
  for (const r of availableRooms) {
    (byFloor[r.floor] ||= []).push(r);
  }

  const candidates = [];
  for (const floor in byFloor) {
    const arr = byFloor[floor].slice().sort((a, b) => a.index - b.index);
    if (arr.length >= k) {
      for (let i = 0; i + k <= arr.length; i++) {
        const subset = arr.slice(i, i + k);
        const span = subset[subset.length - 1].index - subset[0].index;
        candidates.push({ rooms: subset, score: span });
      }
    }
  }
  if (candidates.length > 0) {
    candidates.sort((a, b) => a.score - b.score);
    return candidates[0].rooms;
  }

  const sorted = availableRooms
    .slice()
    .sort((a, b) => a.floor - b.floor || a.index - b.index);

  let best = null;
  let bestScore = Infinity;

  for (let i = 0; i + k <= sorted.length; i++) {
    const subset = sorted.slice(i, i + k);

    let maxd = 0;
    for (let a = 0; a < subset.length; a++) {
      for (let b = a + 1; b < subset.length; b++) {
        const d =
          Math.abs(subset[a].index - subset[b].index) +
          Math.abs(subset[a].floor - subset[b].floor) * 2;
        if (d > maxd) maxd = d;
      }
    }

    if (maxd < bestScore) {
      bestScore = maxd;
      best = subset;
    }
  }

  return best;
}


module.exports = { buildInitialRooms, chooseRooms, travelTime };
