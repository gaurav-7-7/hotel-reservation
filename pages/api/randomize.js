import { saveRooms } from "../../lib/db";
import { buildInitialRooms } from "../../lib/rooms";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { occupiedRatio = 0.25 } = req.body;

  const rooms = buildInitialRooms();

  for (const room of rooms) {
    const occ = Math.random() < occupiedRatio;
    room.occupied = occ;
    room.bookingId = occ ? "random" : null;
  }

  await saveRooms(rooms);

  res.json({ ok: true });
}
