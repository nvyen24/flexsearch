//Test query tồn tại / không tồn tại
import FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { getRAM, generateDocs } from "../utils/helper.js";

export function existingQueryTest() {

    const index = new FlexSearch.Index({
        tokenize: "forward"
    });

    generateDocs(index, 100000);

    const queries = [
        "distributed",
        "search",
        "abcxyz",
        "notfoundkeyword"
    ];

    console.log("\n=== EXISTING QUERY TEST ===");
    for (const q of queries) {
        console.time(q);
        const result = index.search(q);
        console.timeEnd(q);
        console.log(
            q,
            "=>",
            result.length,
            "results"
        );
    }

    console.log("RAM:", getRAM(), "MB");
}