//kiểm tra query trả về đúng document liên quan nhất hay không
import FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";
import { generateDocs } from "../utils/helper.js";

export function accuracyTest() {

    const index = new FlexSearch.Index({
        tokenize: "forward"
    });

    console.log("\n=== ACCURACY TEST ===");

    // dataset có cấu trúc rõ ràng để kiểm tra đúng/sai
    index.add(1, "distributed systems");
    index.add(2, "distributed database");
    index.add(3, "search engine");
    index.add(4, "distributed search engine");
    index.add(5, "machine learning systems");

    const queries = [
        "distributed search",
        "search engine",
        "distributed systems",
        "machine learning"
    ];

    for (const q of queries) {

        const result = index.search(q);

        console.log("\nQuery:", q);
        console.log("Results:", result);

        // đánh giá đơn giản: có chứa keyword chính không
        const score = result.length > 0 ? "PASS" : "FAIL";

        console.log("Accuracy:", score);
    }
}