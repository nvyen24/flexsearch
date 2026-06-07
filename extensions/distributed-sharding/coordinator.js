import { Worker } from "worker_threads";

export class Coordinator {

    constructor(shardCount = 4) {

        this.shardCount = shardCount;
        this.shards = [];

        for (let i = 0; i < shardCount; i++) {

            const shard = new Worker(
                new URL("./shard.js", import.meta.url),
                {
                    workerData: {
                        shardId: i
                    },
                    type: "module"
                }
            );

            this.shards.push(shard);
        }
    }

    getShard(id) {

        return id % this.shardCount;
    }

    add(id, content) {

        const shardId = this.getShard(id);

        this.shards[shardId].postMessage({
            type: "add",
            id,
            content
        });
    }

    async search(query, topK = 100) {

        const promises = this.shards.map(shard => {

            return new Promise(resolve => {

                shard.once("message", data => {

                    resolve(data.result);
                });

                shard.postMessage({
                    type: "search",
                    query
                });
            });
        });

        const results =
            await Promise.all(promises);

        const merged =
            [...new Set(results.flat())];

        return merged.slice(0, topK);
    }

    async getStats() {

        const promises = this.shards.map(shard => {

            return new Promise(resolve => {

                shard.once("message", data => {

                    resolve(data);
                });

                shard.postMessage({
                    type: "stats"
                });
            });
        });

        return Promise.all(promises);
    }

    async close() {

        await Promise.all(
            this.shards.map(
                shard => shard.terminate()
            )
        );
    }
}