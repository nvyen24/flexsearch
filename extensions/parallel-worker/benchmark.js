import { performance } from "perf_hooks";
import { WorkerPool } from "./worker-pool.js";

console.log("=== PARALLEL WORKER SEARCH ===");

const pool = new WorkerPool(4, 1000000);

// đợi worker build index
await new Promise(resolve =>
    setTimeout(resolve, 3000)
);

const queries = [
    "distributed",
    "search",
    "search engine",
    "distributed systems"
];

for (const query of queries) {

    const start = performance.now();

    const result = await pool.search(query);

    const end = performance.now();

    console.log("\nQuery:", query);

    console.log(
        "Search Time:",
        (end - start).toFixed(3),
        "ms"
    );

    console.log(
        "Results:",
        result.length
    );
}

await pool.close();