import * as FlexSearch from "../dist/flexsearch.bundle.module.min.mjs";
import { getRAM, generateDocs } from "../utils/helper.js";

export function indexingTest() {

    const index = new FlexSearch.Index({
        tokenize: "forward"
    });

    const TOTAL_DOCS = 100000;

    console.log("\n=== INDEXING TEST ===");

    console.log("RAM Before:", getRAM(), "MB");

    console.time("Indexing");

    generateDocs(index, TOTAL_DOCS);

    console.timeEnd("Indexing");

    console.log("RAM After:", getRAM(), "MB");
}