import { Coordinator } from "./coordinator.js";
import { performance } from "perf_hooks";

const TOTAL_DOCS = 1000000;

function getRAM() {
    return (
        process.memoryUsage().heapUsed /
        1024 /
        1024
    ).toFixed(2);
}

console.log("================================");
console.log("DISTRIBUTED SHARDING TEST");
console.log("================================");

console.log("RAM Before:", getRAM(), "MB");

const coordinator = new Coordinator(4);

const topics = [
    "distributed systems",
    "search engine",
    "machine learning",
    "database systems",
    "computer networks",
    "cloud computing",
    "big data",
    "artificial intelligence"
];

console.time("Indexing");

for (let i = 0; i < TOTAL_DOCS; i++) {

    const topic =
        topics[i % topics.length];

    coordinator.add(
        i,
        `document ${i} about ${topic}`
    );
}

console.timeEnd("Indexing");

console.log(
    "\nWaiting workers finish indexing..."
);

// cho worker xử lý hết queue
await new Promise(resolve =>
    setTimeout(resolve, 10000)
);

console.log(
    "RAM After:",
    getRAM(),
    "MB"
);
// ====================
// SHARD STATS
// ====================

console.log("\nGetting shard stats...");

const stats =
    await coordinator.getStats();

console.log("\n=== SHARD STATS ===");

let totalDocs = 0;
let totalRam = 0;

for (const s of stats) {

    totalDocs += s.documents;
    totalRam += Number(s.ram);

    console.log(
        `Shard ${s.shardId}: ` +
        `${s.documents} docs | ` +
        `${s.ram} MB`
    );
}

console.log("--------------------------------");

console.log(
    "Total Documents:",
    totalDocs
);

console.log(
    "Total Worker RAM:",
    totalRam.toFixed(2),
    "MB"
);

// ====================
// SEARCH TEST
// ====================

const queries = [
    "distributed systems",
    "search engine",
    "machine learning",
    "cloud computing"
];

let totalSearchTime = 0;

console.log("\n=== SEARCH TEST ===");

for (const query of queries) {

    const start =
        performance.now();

    const result =
        await coordinator.search(
            query,
            100
        );

    const end =
        performance.now();

    const searchTime =
        end - start;

    totalSearchTime +=
        searchTime;

    console.log(
        `Query: ${query}`
    );

    console.log(
        `Results: ${result.length}`
    );

    console.log(
        `Time: ${searchTime.toFixed(3)} ms`
    );

    console.log("--------------------------------");
}

console.log(
    "Average Search Time:",
    (
        totalSearchTime /
        queries.length
    ).toFixed(3),
    "ms"
);

// ====================
// CLEANUP
// ====================

await coordinator.close();

console.log("\nDone.");