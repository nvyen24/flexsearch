import { Worker } from "worker_threads";

export class WorkerPool {

    constructor(workerCount = 4, totalDocs) {

        this.workerCount = workerCount;
        this.totalDocs = totalDocs;
        this.workers = [];
        this.readyWorkers = 0;

        const chunk = Math.floor(totalDocs / workerCount);

        for (let i = 0; i < workerCount; i++) {

            const start = i * chunk;

            const end =
                i === workerCount - 1
                    ? totalDocs
                    : start + chunk;

            const worker = new Worker(
                new URL("./worker.js", import.meta.url),
                {
                    workerData: {
                        start,
                        end
                    },
                    type: "module"
                }
            );

            this.workers.push(worker);
        worker.on("message", msg => {

    if (msg.type === "ready") {

        this.readyWorkers++;

        console.log(
            `Ready ${this.readyWorkers}/${this.workerCount}`
        );
    }
});
        }
    }

    async waitUntilReady() {

    while (
        this.readyWorkers <
        this.workerCount
    ) {

        await new Promise(resolve =>
            setTimeout(resolve, 100)
        );
    }
}

    async search(query, topK = 100) {

    const promises = this.workers.map(worker => {

        return new Promise(resolve => {

            worker.once("message", data => {
                resolve(data.result);
            });

            worker.postMessage({
                type: "search",
                query
            });
        });
    });

    const results = await Promise.all(promises);

    // Merge
    const merged = results.flat();

    // Remove duplicate IDs
    const unique = [...new Set(merged)];

    // Return Top-K
    return unique.slice(0, topK);
}

    async close() {

        await Promise.all(
            this.workers.map(w => w.terminate())
        );
    }
}