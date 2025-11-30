import { useEffect, useState } from "react";
import FloorGrid from "../components/FloorGrid";
import Controls from "../components/Controls";
import BookingList from "../components/BookingList";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const r = await fetch('/api/rooms').then(r=>r.json());
    const b = await fetch('/api/bookings').then(r=>r.json());
    setRooms(r.rooms || []);
    setBookings(b.bookings || []);
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Inter, Arial" }}>
      <h1>Hotel Room Reservation</h1>
      <p>97 rooms across 10 floors. Travel: horizontal 1 min/room, vertical 2 min/floor.</p>
      <Controls onChange={load} loading={loading} />
      <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
        <div style={{ flex: 1 }}>
          <FloorGrid rooms={rooms} />
        </div>
        <div style={{ width: 320 }}>
          <BookingList bookings={bookings} refresh={load} />
        </div>
      </div>
    </div>
  );
}
