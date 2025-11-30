import { getBookings } from "../../lib/db";

export default async function handler(req, res) {
  const bookings = await getBookings();
  res.status(200).json({ bookings });
}
