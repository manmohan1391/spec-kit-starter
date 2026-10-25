// FR-001: group photos by date
export function groupByDate(photos) {
  const albums = {};
  for (const p of photos) {
    const day = p.takenAt.slice(0, 10);
    (albums[day] ??= []).push(p.id);
  }
  return albums;
}

// FR-002: move a photo
export function movePhoto(albums, id, from, to) {
  albums[from] = albums[from].filter((x) => x !== id);
  (albums[to] ??= []).push(id);
  return albums;
}
