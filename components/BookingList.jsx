export default function BookingList({ bookings = [], refresh }) {
  return (
    <div>
      <h3>Bookings</h3>
      <div style={{ maxHeight: 500, overflow: 'auto' }}>
        {bookings.length === 0 ? <div>No bookings</div> :
          bookings.map(b => (
            <div key={b.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
              <div><strong>{b.id}</strong></div>
              <div>Rooms: {b.rooms.join(', ')}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{b.createdAt}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
