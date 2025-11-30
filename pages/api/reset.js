import { resetAll } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rooms = await resetAll();
  res.status(200).json({ ok: true, rooms });
}
