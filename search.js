const search = require('./engine');
let results = search(process.argv[2]);

for (let i = 0; i < 10; i++) {
    let result = results[i];
    console.log(`[${result.id}] ${result.representations.full}`)
}