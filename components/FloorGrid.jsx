import RoomTile from "./RoomTile";

export default function FloorGrid({ rooms = [] }) {
  const byFloor = {};
  rooms.forEach(r => {
    byFloor[r.floor] = byFloor[r.floor] || [];
    byFloor[r.floor].push(r);
  });

  const floors = [];
  for (let f = 10; f >= 1; f--) {
    const arr = (byFloor[f] || []).sort((a,b)=>a.index - b.index);
    floors.push(
      <div key={f} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ width: 72 }}>Floor {f}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {arr.map(r => <RoomTile key={r.id} room={r} />)}
        </div>
      </div>
    );
  }

  return <div>{floors}</div>;
}
