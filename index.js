(async () => {
    console.log(await require('./natural')(process.argv[2]));
})();