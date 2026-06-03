//xem FlexSearch có chịu lỗi chính tả không
import FlexSearch from "../../dist/flexsearch.bundle.module.min.mjs";

export function fuzzySearchTest() {
    const index = new FlexSearch.Index({
        tokenize: "forward"
    });

    console.log("\n=== FUZZY SEARCH TEST ===");

    index.add(1, "distributed systems");
    index.add(2, "search engine");
    index.add(3, "database management");

    const queries = [
        "distributd",      
        "searh engine",    
        "databse",         
        "distributed",     
        "engine search"    
    ];

    for (const q of queries) {
        const result = index.search(q);
        console.log("\nQuery:", q);
        console.log("Results:", result.length);
        console.log("Data:", result);
    }
}