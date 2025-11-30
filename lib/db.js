import clientPromise from "./mongodb";
import { buildInitialRooms } from "./rooms";

export async function getDB() {
  const client = await clientPromise;
  return client.db("hotelDB"); // database name
}

export async function getRooms() {
  const db = await getDB();
  const roomsCol = db.collection("rooms");

  const rooms = await roomsCol.find().toArray();

  if (rooms.length === 0) {
    const initial = buildInitialRooms();
    await roomsCol.insertMany(initial);
    return initial;
  }
  return rooms;
}

export async function saveRooms(rooms) {
  const db = await getDB();
  const roomsCol = db.collection("rooms");

  for (const r of rooms) {
    await roomsCol.updateOne(
      { id: r.id },
      { $set: r },
      { upsert: true }
    );
  }
}

// ---------- Bookings ----------
export async function getBookings() {
  const db = await getDB();
  const col = db.collection("bookings");
  return await col.find().toArray();
}

export async function saveBooking(booking) {
  const db = await getDB();
  const col = db.collection("bookings");
  await col.insertOne(booking);
}

export async function resetAll() {
  const db = await getDB();
  const roomsCol = db.collection("rooms");
  const bookingsCol = db.collection("bookings");

  const initial = buildInitialRooms();

  await roomsCol.deleteMany({});
  await roomsCol.insertMany(initial);

  await bookingsCol.deleteMany({});

  return initial;
}
