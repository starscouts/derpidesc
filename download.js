function sleep(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

async function download(autoAbort, url) {
    const fs = require('fs');
    const describe = require('./natural');

    let db = require('./db.json');
    let added = 1;
    let list = [null];
    let page = 0;
    let lastSave = db.length;

    while ((autoAbort && added > 0) || (!autoAbort && list.length > 0)) {
        page++;
        added = 0;
        let data;

        try {
            data = await (await fetch(url.replace("1234567890", page))).json();
            list = data["images"];
        } catch (e) {
            console.error(e);
            await sleep(1000);
            continue;
        }

        for (let image of data['images']) {
            if (!db.map(i => i.id).includes(image.id)) {
                image._natural = await describe(image);
                db.push(image);
                added++;
            }
        }

        db = db.sort((a, b) => new Date(b['created_at']) - new Date(a['created_at'])).slice(0, 180000);
        console.log(`Added ${added} entries, total ${db.length}, ${data['total'] - (50 * page)} left to add`);

        if (db.length - lastSave >= 500) {
            fs.writeFileSync("./db.json", JSON.stringify(db));
            lastSave = db.length;
        }

        await sleep(700);
    }

    fs.writeFileSync("./db.json", JSON.stringify(db));
}

(async () => {
    await download(true, "https://derpibooru.org/api/v1/json/search/images?q=*&filter_id=56027&page=1234567890&per_page=50");
    await download(false, "https://derpibooru.org/api/v1/json/search/images?q=" + encodeURIComponent("my:upvotes") + "&key=" + require('fs').readFileSync("./key").toString().trim() + "&filter_id=56027&page=1234567890&per_page=50")
    await download(false, "https://derpibooru.org/api/v1/json/search/images?q=" + encodeURIComponent("my:downvotes") + "&key=" + require('fs').readFileSync("./key").toString().trim() + "&filter_id=56027&page=1234567890&per_page=50")
    await download(false, "https://derpibooru.org/api/v1/json/search/images?q=" + encodeURIComponent("faved_by:Sheid") + "&filter_id=56027&page=1234567890&per_page=50")
})();