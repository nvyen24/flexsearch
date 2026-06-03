//So sánh tokenize mode
import FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { generateDocs } from "../utils/helper.js";

export function tokenizeTest() {
    const modes = [
        "strict",
        "forward",
        "reverse",
        "full"
    ];

    for (const mode of modes) {

        const index = new FlexSearch.Index({
            tokenize: mode
        });

        generateDocs(index, 100000);
        console.log(`\n=== ${mode} ===`);
        console.time("Search");
        index.search("distributed");
        console.timeEnd("Search");
    }
}