import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupByDate, movePhoto } from '../src/albums.js';

const photos = [
  { id: 'a', takenAt: '2026-10-24T09:00' },
  { id: 'b', takenAt: '2026-10-24T18:30' },
  { id: 'c', takenAt: '2026-10-25T08:15' },
];

test('groups 3 photos from 2 days into 2 albums', () => {
  assert.deepEqual(Object.keys(groupByDate(photos)), ['2026-10-24', '2026-10-25']);
});

test('moves a photo between albums', () => {
  const albums = movePhoto(groupByDate(photos), 'b', '2026-10-24', '2026-10-25');
  assert.deepEqual(albums['2026-10-25'], ['c', 'b']);
});
