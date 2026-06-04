export const TOTAL_DOCS = 7000000;

export const QUERIES = [
    "distributed",
    "search",
    "search engine",
    "distributed systems"
];

export function createDocument(id) {
    return `document ${id} about distributed systems and search engine`;
}