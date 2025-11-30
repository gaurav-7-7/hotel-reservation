// GET /api/rooms
const { getStore, initStore } = require("../../lib/persist-memory");
const { buildInitialRooms } = require("../../lib/rooms");

export default function handler(req, res) {
  const store = getStore();
  if (!store.rooms) store.rooms = buildInitialRooms();
  return res.status(200).json({ rooms: store.rooms });
}
