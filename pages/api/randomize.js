import { getRooms, saveRooms, saveBooking } from "../../lib/db";
import { buildInitialRooms } from "../../lib/rooms";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { occupiedRatio = 0.25 } = req.body;

  let rooms = buildInitialRooms();
  rooms = rooms.map(r => ({
    ...r,
    occupied: Math.random() < occupiedRatio,
    bookingId: Math.random() < occupiedRatio ? "random" : null
  }));

  await saveRooms(rooms);

  res.status(200).json({ rooms });
}
