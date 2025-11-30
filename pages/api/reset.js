// POST /api/reset
const { getStore } = require("../../lib/persist-memory");
const { buildInitialRooms } = require("../../lib/rooms");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const store = getStore();
  store.rooms = buildInitialRooms();
  store.bookings = [];
  return res.status(200).json({ ok: true });
}
