import { useState } from "react";

export default function Controls({ onChange, loading }) {
  const [numRooms, setNumRooms] = useState(1);
  const [message, setMessage] = useState("");

  async function book() {
    setMessage("");
    try {
      const res = await fetch('/api/book', {
        method: "POST", headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ numRooms })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Booking failed");
      } else {
        setMessage(`Booked rooms: ${data.booking.rooms.join(', ')}`);
        onChange && onChange();
      }
    } catch (e) { setMessage(e.message); }
  }

  async function randomize() {
    setMessage("");
    await fetch('/api/randomize', {
      method: "POST", headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ occupiedRatio: 0.25 })
    });
    onChange && onChange();
  }

  async function reset() {
    setMessage("");
    await fetch('/api/reset', { method: "POST" });
    onChange && onChange();
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label>Rooms to book (1-5):</label>
        <input type="number" min="1" max="5" value={numRooms}
          onChange={e=>setNumRooms(Number(e.target.value))} />
        <button onClick={book} disabled={loading}>Book</button>
        <button onClick={randomize} disabled={loading}>Randomize</button>
        <button onClick={reset} disabled={loading}>Reset</button>
      </div>
      <div style={{ marginTop: 8, color: '#333' }}>{message}</div>
    </div>
  );
}
