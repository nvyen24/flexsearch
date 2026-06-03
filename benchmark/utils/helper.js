//Chứa hàm dùng chung
export function getRAM() {
    return (
        process.memoryUsage().heapUsed / 1024 / 1024
    ).toFixed(2);
}

export function generateDocs(index, totalDocs) {
    for (let i = 0; i < totalDocs; i++) {
        index.add(
            i,
            `document number ${i} about distributed systems and search engine`
        );
    }
}