// POST /api/randomize { occupiedRatio }
const { getStore } = require("../../lib/persist-memory");
const { buildInitialRooms } = require("../../lib/rooms");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { occupiedRatio = 0.2 } = req.body;
  const store = getStore();
  store.rooms = buildInitialRooms();
  store.rooms.forEach(r => {
    r.occupied = Math.random() < (Number(occupiedRatio) || 0.2);
    r.bookingId = r.occupied ? "random" : null;
  });
  store.bookings = [];
  return res.status(200).json({ rooms: store.rooms });
}
