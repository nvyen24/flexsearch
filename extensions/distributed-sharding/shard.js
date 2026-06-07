import { parentPort, workerData } from "worker_threads";
import * as FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";

const index = new FlexSearch.Index({
    tokenize: "forward"
});

console.log(`Shard ${workerData.shardId} starting`);

parentPort.on("message", msg => {

    switch (msg.type) {

        case "add":

            index.add(
                msg.id,
                msg.content
            );

            break;

        case "search":

            const result =
                index.search(msg.query);

            parentPort.postMessage({
                shardId:
                    workerData.shardId,
                result
            });

            break;
    }
});