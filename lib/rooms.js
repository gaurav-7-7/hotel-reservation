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

// chooseRooms as described in plan
function chooseRooms(availableRooms, k) {
  if (k < 1 || k > 5) throw new Error("k must be 1..5");

  // group by floor
  const byFloor = {};
  for (const r of availableRooms) {
    byFloor[r.floor] = byFloor[r.floor] || [];
    byFloor[r.floor].push(r);
  }

  const candidates = [];
  // same-floor contiguous windows (minimizes horizontal span)
  for (const floor of Object.keys(byFloor)) {
    const arr = byFloor[floor].slice().sort((a,b)=>a.index - b.index);
    if (arr.length >= k) {
      for (let i = 0; i + k - 1 < arr.length; i++) {
        const subset = arr.slice(i, i + k);
        const span = subset[subset.length - 1].index - subset[0].index;
        const score = span * 1; // horizontal only
        candidates.push({ rooms: subset, score, type: "same-floor" });
      }
    }
  }
  if (candidates.length > 0) {
    candidates.sort((a,b)=>a.score - b.score);
    return candidates[0].rooms;
  }

  // cross-floor: enumerate combinations (k <= 5)
  const avail = availableRooms;
  if (avail.length < k) return null;
  let best = { rooms: null, score: Infinity };

  function comb(start, chosen) {
    if (chosen.length === k) {
      let maxd = 0;
      for (let i = 0; i < chosen.length; i++) {
        for (let j = i + 1; j < chosen.length; j++) {
          const d = travelTime(chosen[i], chosen[j]);
          if (d > maxd) maxd = d;
        }
      }
      if (maxd < best.score) {
        best = { rooms: chosen.slice(), score: maxd };
      }
      return;
    }
    for (let i = start; i < avail.length; i++) {
      chosen.push(avail[i]);
      comb(i + 1, chosen);
      chosen.pop();
    }
  }
  comb(0, []);
  return best.rooms;
}

module.exports = { buildInitialRooms, chooseRooms, travelTime };
