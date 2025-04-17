let lastCount = 1;
let page = 1;
let list = [];
let expectedTotal = Infinity;

function sleep(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

(async () => {
    while (lastCount > 0) {
        await sleep(500);

        let data = await (await fetch("https://derpibooru.org/api/v1/json/search/tags?q=category:character&per_page=50&page=" + page)).json();
        let tags = data['tags'].map(i => i.name);
        list.push(...tags);

        if (isFinite(expectedTotal)) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(((list.length / expectedTotal) * 100).toFixed(2) + "%");
        } else {
            expectedTotal = data['total'];
        }

        lastCount = tags.length;
        page++;
    }

    require('fs').writeFileSync("./characters.json", JSON.stringify(list, null, 2));
})();