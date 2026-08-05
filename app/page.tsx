// The site index now renders the index_v2 design. The implementation lives in
// app/index_v2/ (still reachable at /index_v2 and actively iterated on there);
// re-exporting it here keeps the homepage and that route in sync from one source.
export { default, metadata } from "./index_v2/page";
