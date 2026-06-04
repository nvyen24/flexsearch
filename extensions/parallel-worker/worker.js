import { parentPort, workerData } from "worker_threads";
import * as FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { createDocument } from "./data.js";

const index = new FlexSearch.Index({
    tokenize: "forward"
});

const { start, end } = workerData;

console.log(`Worker ${start}-${end} building index...`);

for (let i = start; i < end; i++) {
        index.add(
        i,
        createDocument(i)
    );
}

console.log(`Worker ${start}-${end} ready`);
parentPort.postMessage({
    type: "ready"
});

parentPort.on("message", (msg) => {

    if (msg.type === "search") {

        const result = index.search(
            msg.query,
            // {
            //     limit: 25000
            // }
        );

        parentPort.postMessage({
            query: msg.query,
            result
            
        });
    }
});