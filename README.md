# performance-react-poc

Simple React performance demo with only two list components:

- `BadList`: derives filtered items in an effect, uses index keys, and re-renders on unrelated parent updates.
- `GoodList`: uses `memo`, `useMemo`, stable updates, and ignores unrelated parent renders.

## Scripts

- `yarn dev`
- `yarn build`
- `yarn lint`
- `yarn preview`

## Profiling

`react-scan` is enabled automatically in development from `src/main.tsx`.

1. Run `yarn dev`
2. Open the React Scan toolbar
3. Click `Trigger 20 parent renders`
4. Type into the filter input or edit the item inputs

The bad component should show more unnecessary work than the good component.
