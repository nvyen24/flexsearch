import { performance } from "perf_hooks";
import { WorkerPool } from "./worker-pool.js";


import {
    TOTAL_DOCS,
    QUERIES
} from "./data.js";
console.log("=== PARALLEL WORKER SEARCH ===");

const pool = new WorkerPool(4, TOTAL_DOCS);

// đợi worker build index
await new Promise(resolve =>
    setTimeout(resolve, 3000)
);


for (const query of QUERIES) {

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