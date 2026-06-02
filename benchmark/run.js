import { indexingTest } from "./tests/indexing-test.js";
import { existingQueryTest } from "./tests/existing-query-test.js";
import { multiKeywordTest } from "./tests/multi-keyword-test.js";
import { tokenizeTest } from "./tests/tokenize-test.js";

indexingTest();

existingQueryTest();

multiKeywordTest();

tokenizeTest();