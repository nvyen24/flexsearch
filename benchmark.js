// // test tốc độ + dữ liệu lớn
// import * as FlexSearch from "./dist/flexsearch.bundle.module.min.mjs";

// const index = new FlexSearch.Index({
//     tokenize: "forward"
// });
// const TOTAL_DOCS = 100000;
// function getRAM() {
//     return (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
// }
// console.log("================================");
// console.log("BEFORE INDEX RAM:", getRAM(), "MB");
// console.log("================================");
// console.log("Adding documents...");

// console.time("Indexing Time");

// // thêm dữ liệu giả
// for (let i = 0; i < TOTAL_DOCS; i++) {
//     index.add(
//         i,
//         `document number ${i} about distributed systems and search engine`
//     );
// }
// console.timeEnd("Indexing Time");
// console.log("Documents added:", TOTAL_DOCS);
// console.log("AFTER INDEX RAM:", getRAM(), "MB");
// console.log("--------------------------------");

// // đo thời gian truy vấn
// console.time("Search Time");
// const result = index.search("distributed");
// console.timeEnd("Search Time");
// console.log("Results found:", result.length);
// console.log("SEARCH RAM:", getRAM(), "MB");
// console.log("First 10 results:", result.slice(0, 10));


// // test key tồn tại hay không tồn tại
// import FlexSearch from "flexsearch"
// import { performance } from "perf_hooks"

// const index = new FlexSearch.Index({
//   tokenize: "forward"
// })

// // fake data (test nhanh)
// index.add(1, "hello world")
// index.add(2, "search engine optimization")
// index.add(3, "world of javascript")

// const queries = ["hello", "world", "search engine"]

// let totalTime = 0

// for (const q of queries) {
//   const t0 = performance.now()

//   const result = index.search(q)

//   const t1 = performance.now()

//   console.log("Query:", q)
//   console.log("Result:", result)

//   totalTime += (t1 - t0)
// }

// console.log("Avg time:", totalTime / queries.length, "ms")
// console.log("Memory:", process.memoryUsage().heapUsed / 1024 / 1024, "MB")


import * as FlexSearch from "./dist/flexsearch.bundle.module.min.mjs";

const index = new FlexSearch.Index({
    tokenize: "forward"
});

const TOTAL_DOCS = 100000;

function getRAM() {
    return (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
}

console.log("=== MULTI KEYWORD SEARCH TEST ===");
console.log("RAM Before Index:", getRAM(), "MB");

console.time("Indexing Time");

for (let i = 0; i < TOTAL_DOCS; i++) {
    index.add(
        i,
        `document number ${i} about distributed systems and search engine`
    );
}

console.timeEnd("Indexing Time");

console.log("RAM After Index:", getRAM(), "MB");
console.log("--------------------------------");

// Các truy vấn nhiều từ
const queries = [
    "distributed systems",
    "search engine",
    "distributed search engine",
    "document number",
    "distributed systems search engine"
];

for (const q of queries) {

    console.log("\nQuery:", q);

    console.time(`Search: "${q}"`);

    const result = index.search(q);

    console.timeEnd(`Search: "${q}"`);

    console.log("Results found:", result.length);
    console.log("First 10 IDs:", result.slice(0, 10));
}

console.log("\nRAM After Search:", getRAM(), "MB");