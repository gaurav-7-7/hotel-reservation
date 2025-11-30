// GET /api/rooms
import { getRooms } from "../../lib/db";

export default async function handler(req, res) {
  const rooms = await getRooms();
  res.status(200).json({ rooms });
}
