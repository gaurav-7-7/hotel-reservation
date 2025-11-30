// POST /api/book { numRooms }
const { getStore } = require("../../lib/persist-memory");
const { chooseRooms } = require("../../lib/rooms");
import { nanoid } from "nanoid";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { numRooms } = req.body;
  const n = parseInt(numRooms, 10);
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    return res.status(400).json({ error: "numRooms must be integer 1..5" });
  }
  const store = getStore();
  if (!store.rooms) return res.status(500).json({ error: "store not initialized" });

  const available = store.rooms.filter(r => !r.occupied);
  if (available.length < n) return res.status(400).json({ error: "Not enough available rooms" });

  const chosen = chooseRooms(available, n);
  if (!chosen || chosen.length !== n) return res.status(500).json({ error: "Could not find rooms" });

  const bookingId = nanoid();
  chosen.forEach(c => {
    const room = store.rooms.find(x => x.id === c.id);
    room.occupied = true;
    room.bookingId = bookingId;
  });
  const booking = { id: bookingId, rooms: chosen.map(r => r.id), createdAt: new Date().toISOString() };
  store.bookings = store.bookings || [];
  store.bookings.push(booking);
  return res.status(200).json({ booking });
}
