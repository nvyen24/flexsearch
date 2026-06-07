import { parentPort, workerData } from "worker_threads";
import * as FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";

const index = new FlexSearch.Index({
    tokenize: "forward"
});

let documentCount = 0;

console.log(`Shard ${workerData.shardId} starting`);

parentPort.on("message", (msg) => {

    switch (msg.type) {

        case "add":

            index.add(
                msg.id,
                msg.content
            );

            documentCount++;

            break;

        case "search":

            parentPort.postMessage({
                type: "search-result",
                shardId: workerData.shardId,
                result: index.search(msg.query)
            });

            break;

        case "stats": {

            console.log(
                `Shard ${workerData.shardId} stats requested`
            );

            const ram =
                process.memoryUsage().heapUsed /
                1024 /
                1024;

            parentPort.postMessage({
                type: "stats",
                shardId: workerData.shardId,
                documents: documentCount,
                ram: ram.toFixed(2)
            });

            break;
        }
    }
});