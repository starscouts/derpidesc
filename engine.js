const db = require('./db.json');
console.log("Database contains " + db.length + " images");

function fuzzy(query) {
    query = query.replace(/\W+/gm, " ").replace(/ +/gm, " ").toLowerCase().split(" ");
    let results = [];

    for (let item of db) {
        let words = item._natural.replace(/\W+/gm, " ").replace(/ +/gm, " ").toLowerCase().split(" ");

        for (let tag of item.tags) {
            words.push(...tag.replace(/\W+/gm, " ").replace(/ +/gm, " ").toLowerCase().split(" "));
        }

        let score = words.filter(i => query.includes(i)).length / query.length;
        results.push({
            item,
            score
        });
    }

    return results.filter(i => i.score > 0.5);
}

function getMatchingTags(tags, words) {
    let count = 0;

    for (let tag of tags) {
        if (words.includes(tag.toLowerCase()) && tag.length > 2) {
            count++;
        }
    }

    return count;
}

function search(query) {
    return fuzzy(query).map(i => i.item).sort((a, b) => {
        return getMatchingTags(b['tags'], query.toLowerCase()) - getMatchingTags(a['tags'], query.toLowerCase())
    });
}

module.exports = search;