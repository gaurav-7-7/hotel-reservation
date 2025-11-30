// GET /api/bookings
const { getStore } = require("../../lib/persist-memory");
export default function handler(req, res) {
  const store = getStore();
  store.bookings = store.bookings || [];
  res.status(200).json({ bookings: store.bookings });
}
