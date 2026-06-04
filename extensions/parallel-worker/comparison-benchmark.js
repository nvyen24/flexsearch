import * as FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { performance } from "perf_hooks";
import { WorkerPool } from "./worker-pool.js";

const TOTAL_DOCS = 1000000;

console.log("=== SINGLE VS PARALLEL SEARCH ===");

// ====================
// Single Index
// ====================

const singleIndex = new FlexSearch.Index({
    tokenize: "forward"
});

console.log("\nBuilding Single Index...");

for (let i = 0; i < TOTAL_DOCS; i++) {

    singleIndex.add(
        i,
        `document ${i} about distributed systems and search engine`
    );
}

console.log("Single Index Ready");

// ====================
// Parallel Pool
// ====================

console.log("\nBuilding Worker Pool...");

const pool = new WorkerPool(4, TOTAL_DOCS);

// đợi worker build xong
// await new Promise(resolve =>
//     setTimeout(resolve, 3000)
// );
await pool.waitUntilReady();

console.log("Worker Pool Ready");

// ====================
// Queries
// ====================

const queries = [
    "distributed",
    "search",
    "search engine",
    "distributed systems"
];
let totalSingle = 0;
let totalParallel = 0;

console.log("\n==============================================");
console.log("Query\t\tSingle(ms)\tParallel(ms)\tSpeedup");
console.log("==============================================");

for (const query of queries) {

    // Single Search
    let start = performance.now();

    singleIndex.search(query);

    let end = performance.now();

    const singleTime = end - start;

    // Parallel Search
    start = performance.now();

    await pool.search(query);

    end = performance.now();

    const parallelTime = end - start;

    const speedup =
        singleTime / parallelTime;
    totalSingle += singleTime;
    totalParallel += parallelTime;
    console.log(
        `${query.padEnd(20)}\t` +
        `${singleTime.toFixed(3)}\t\t` +
        `${parallelTime.toFixed(3)}\t\t` +
        `${speedup.toFixed(2)}x`
    );
}
console.log("\n==============================================");

console.log(
    "Average Single:",
    (totalSingle / queries.length).toFixed(3),
    "ms"
);

console.log(
    "Average Parallel:",
    (totalParallel / queries.length).toFixed(3),
    "ms"
);

console.log(
    "Average Speedup:",
    (totalSingle / totalParallel).toFixed(2),
    "x"
);

await pool.close();