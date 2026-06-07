import { Worker } from "worker_threads";

export class Coordinator {

    constructor(shardCount = 4) {

        this.shardCount =
            shardCount;

        this.shards = [];

        for (
            let i = 0;
            i < shardCount;
            i++
        ) {

            const shard =
                new Worker(
                    new URL(
                        "./shard.js",
                        import.meta.url
                    ),
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

    getShard(docId) {

        return docId %
            this.shardCount;
    }

    add(id, content) {

        const shardId =
            this.getShard(id);

        this.shards[shardId]
            .postMessage({
                type: "add",
                id,
                content
            });
    }

    async search(query) {

        const promises =
            this.shards.map(
                shard =>
                    new Promise(resolve => {

                        shard.once(
                            "message",
                            data =>
                                resolve(
                                    data.result
                                )
                        );

                        shard.postMessage({
                            type: "search",
                            query
                        });
                    })
            );

        const results =
            await Promise.all(
                promises
            );

        return [...new Set(
            results.flat()
        )];
    }

    async close() {

        await Promise.all(
            this.shards.map(
                s => s.terminate()
            )
        );
    }
}