# Example: photo albums

The finished result of the 6-step walkthrough in the [main guide](../../README.md#try-it-build-photo-albums-in-6-steps). Compare it with what Claude produces for you. Your files will differ in wording, but they should have the same shape.

| Step | File |
|---|---|
| 1. Constitution | [`.specify/memory/constitution.md`](.specify/memory/constitution.md) |
| 2. Specify | [`specs/001-photo-albums/spec.md`](specs/001-photo-albums/spec.md) |
| 3. Plan | [`specs/001-photo-albums/plan.md`](specs/001-photo-albums/plan.md) |
| 4. Tasks | [`specs/001-photo-albums/tasks.md`](specs/001-photo-albums/tasks.md) |
| 5. Implement | [`src/albums.js`](src/albums.js), [`tests/albums.test.js`](tests/albums.test.js) |

The documents are shortened so they're easy to read. The ones Spec Kit generates are longer and follow its templates in `.specify/templates/`. `tasks.md` is shown as it looks **before** implement; after implement, every box is ticked `[x]`.

## Run the tests

Needs Node.js 20 or newer.

```bash
npm test
```

```
# pass 2
# fail 0
```

This folder only holds the outputs. To run the Spec Kit commands yourself, start a fresh project with `specify init photo-albums --integration claude`.
