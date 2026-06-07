import { performance } from "perf_hooks";
import { Coordinator } from "./coordinator.js";

const TOTAL_DOCS = 1000000;

const coordinator =
    new Coordinator(4);

console.log(
    "Adding documents..."
);

for (
    let i = 0;
    i < TOTAL_DOCS;
    i++
) {

    coordinator.add(
        i,
        `document ${i}
         about distributed systems
         and search engine`
    );
}

await new Promise(resolve =>
    setTimeout(resolve, 3000)
);

console.log(
    "Documents indexed"
);

const query =
    "distributed systems";

const start =
    performance.now();

const result =
    await coordinator.search(
        query
    );

const end =
    performance.now();

console.log(
    "Results:",
    result.length
);

console.log(
    "Search Time:",
    (end - start).toFixed(3),
    "ms"
);

await coordinator.close();