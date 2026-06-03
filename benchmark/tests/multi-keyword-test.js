//Test tìm kiếm nhiều keyword
import FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { generateDocs, getRAM } from "../utils/helper.js";

export function multiKeywordTest() {
    const index = new FlexSearch.Index({
        tokenize: "forward"
    });

    generateDocs(index, 100000);

    const queries = [
        "distributed systems",
        "search engine",
        "distributed search engine",
        "document number",
        "distributed systems search engine"
    ];

    console.log("\n=== MULTI KEYWORD TEST ===");

    for (const q of queries) {
        console.time(q);
        const result = index.search(q)
        console.timeEnd(q);
        console.log(
            "Found:",
            result.length
        );
    }

    console.log("RAM:", getRAM(), "MB");
}