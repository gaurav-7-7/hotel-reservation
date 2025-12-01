import { nanoid } from "nanoid";
import { chooseRooms } from "../../lib/rooms";
import { getRooms, saveRooms, saveBooking } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const k = parseInt(req.body.numRooms, 10);
  if (!k || k < 1 || k > 5) {
    return res.status(400).json({ error: "numRooms must be between 1 and 5" });
  }

  const rooms = await getRooms();
  const available = [];
  for (const r of rooms) {
    if (!r.occupied) available.push(r);
  }
  if (available.length < k) {
    return res.status(400).json({ error: "Not enough available rooms" });
  }

  const selected = chooseRooms(available, k);
  if (!selected) {
    return res.status(400).json({ error: "Could not find suitable rooms" });
  }

  const bookingId = nanoid();
  const selectedIds = selected.map(r => r.id);

  // Use hash map for O(1) lookup
  const selectedSet = new Set(selectedIds);

  for (const r of rooms) {
    if (selectedSet.has(r.id)) {
      r.occupied = true;
      r.bookingId = bookingId;
    }
  }

  await saveRooms(rooms);

  const booking = {
    id: bookingId,
    rooms: selectedIds,
    createdAt: new Date().toISOString()
  };
  
  await saveBooking(booking);

  res.status(200).json({ booking });
}
