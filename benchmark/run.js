import { indexingTest } from "./tests/indexing-test.js";
import { existingQueryTest } from "./tests/existing-query-test.js";
import { multiKeywordTest } from "./tests/multi-keyword-test.js";
import { tokenizeTest } from "./tests/tokenize-test.js";
import { accuracyTest } from "./tests/accuracy-test.js";
import { fuzzySearchTest } from "./tests/fuzzy-search-test.js";
import { parallelWorkerTest } from "./tests/parallel-worker-test.js";
import { distributedShardingTest } from "./tests/distributed-sharding-test.js";

//Test tốc độ index + RAM
indexingTest();

//Test query tồn tại / không tồn tại
existingQueryTest();

//tìm kiếm nhiều keyword
multiKeywordTest();

tokenizeTest();

//độ chính xác kết quả
accuracyTest();

//chịu lỗi chính tả
fuzzySearchTest();

//tìm kiếm song song
parallelWorkerTest();