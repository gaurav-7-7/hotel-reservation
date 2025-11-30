export default function RoomTile({ room }) {
  const style = {
    width: 46, height: 38, borderRadius: 6, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: 12,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    background: room.occupied ? '#f87171' : '#86efac',
    color: '#111'
  };
  return <div title={`${room.id} (${room.floor}-${room.index})`} style={style}>
    {room.id}
  </div>;
}
