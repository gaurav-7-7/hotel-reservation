import { nanoid } from "nanoid";
import { chooseRooms } from "../../lib/rooms";
import { getRooms, saveRooms, getBookings, saveBooking } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { numRooms } = req.body;
  const k = parseInt(numRooms);

  if (!k || k < 1 || k > 5) {
    return res.status(400).json({ error: "numRooms must be between 1 and 5" });
  }

  let rooms = await getRooms();
  let bookings = await getBookings();

  const available = rooms.filter(r => !r.occupied);

  if (available.length < k) {
    return res.status(400).json({ error: "Not enough available rooms" });
  }

  const selected = chooseRooms(available, k);
  if (!selected) {
    return res.status(400).json({ error: "Could not find suitable rooms" });
  }

  const bookingId = nanoid();
  const selectedIds = selected.map(r => r.id);

  rooms = rooms.map(r =>
    selectedIds.includes(r.id)
      ? { ...r, occupied: true, bookingId }
      : r
  );

  // Save rooms & booking
  await saveRooms(rooms);

  const booking = {
    id: bookingId,
    rooms: selectedIds,
    createdAt: new Date().toISOString()
  };
  
  await saveBooking(booking);

  res.status(200).json({ booking });
}
