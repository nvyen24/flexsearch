const FlexSearch = require("./dist/flexsearch.bundle.min.js");

const index = new FlexSearch.Index({
    tokenize: "forward"
});

index.add(1, "hello world");
index.add(2, "distributed systems");
index.add(3, "search engine");
index.add(4, "hello vietnam");

console.log("Search hello:");
console.log(index.search("hello"));

console.log("Search search:");
console.log(index.search("search"));