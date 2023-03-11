### Generate dependency graph

```
npx depcruise src --include-only "^src" --config --output-type dot | dot -T svg > dependency-graph.svg
```