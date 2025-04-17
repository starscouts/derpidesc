let express = require('express');
let app = express();

console.log("Loading database...");
const search = require('./engine');
console.log("Database loaded");

app.use('/assets', express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/api', function (req, res) {
    let data = {
        success: false,
        error: "- Missing ?q",
        results: null
    }

    if (req.query.q) {
        data.error = null;
        let page = 1;

        if (req.query.p) page = parseInt(req.query.p);
        if (isNaN(page) || !isFinite(page)) page = 1;

        console.log("Search for: " + req.query.q);

        try {
            data.results = search(req.query.q);
            data.success = true;
            console.log("Done");
        } catch (e) {
            console.error(e);
            data.error = e.name + ": " + e.message;
            console.log("Failed");
        }
    }

    res.contentType("application/json");
    res.send(JSON.stringify(data, null, 2));
    res.end();
});


app.get('/api/v1/json/*', async function (req, res) {
    res.contentType("application/json");
    try {
        res.send(await (await fetch("https://derpibooru.org/" + req.url)).json());
    } catch (e) {
        console.error(e);
    }
    res.end();
});

app.listen(8080);
console.log('Server is listening on port 8080');
