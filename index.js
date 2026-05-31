import FlexSearch from "flexsearch"

// tạo index
export const index = new FlexSearch.Index({
  tokenize: "forward",   // bạn có thể đổi: strict | forward | full
  cache: true,
  encode: "default",
  resolution: 9
})

// dữ liệu mẫu (bạn có thể thay bằng MongoDB sau)
// const documents = [
//   "hello world",
//   "world of javascript",
//   "search engine optimization",  
//   "flexsearch is fast",
//   "node js performance testing",
//   "mongodb full text search alternative",
//   "forward strict full mode comparison",
//   "benchmark search engine speed test"
// ]

const words = [
  "hello",
  "world",
  "search",
  "engine",
  "mongodb",
  "javascript",
  "node",
  "performance",
  "flexsearch",
  "index",
  "benchmark",
  "data",
  "query",
  "system"
]

const DOC_SIZE = 1000000; // số lượng từ trong mỗi tài liệu


for (let i = 0; i < DOC_SIZE; i++) {
  const text =
    words[Math.floor(Math.random() * words.length)] + " " +
    words[Math.floor(Math.random() * words.length)] + " " +
    words[Math.floor(Math.random() * words.length)]

  index.add(i, text)
}

// build index
// documents.forEach((text, id) => {
//   index.add(id, text)
// })


console.log("Index built:", DOC_SIZE, "documents")