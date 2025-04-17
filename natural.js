function join(input) {
    if (input.length > 1) {
        let array = [...input];
        const last = array.pop();
        return array.join(', ') + ' and ' + last;
    } else {
        return input[0];
    }
}

function joinSentences(input) {
    if (input.length > 1) {
        let array = [...input];
        const last = array.pop();
        return array.join('; ') + ' and ' + last;
    } else {
        return input[0];
    }
}

function sleep(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

function formatName(name) {
    let separators = [" ", "_", "_", "(", ")"];

    for (let sep of separators) {
        name = name.split(sep).map(i => i.substring(0, 1).toUpperCase() + i.substring(1)).join(sep);
    }

    return name;
}

module.exports = async (id) => {
    let characters = require('./characters.json');

    if (!characters) characters = [];
    let tags;

    if (typeof id === "string" || typeof id === "number") {
        await sleep(500);
        tags = (await (await fetch("https://derpibooru.org/api/v1/json/images/" + id)).json())['image']['tags'];
    } else {
        tags = id['tags'];
    }

    let text = "";

    // 1. Ratings
    let ratings = [];

    if (tags.includes("safe")) ratings.push("safe");
    if (tags.includes("explicit")) ratings.push("explicit");
    if (tags.includes("suggestive")) ratings.push("suggestive");
    if (tags.includes("questionable")) ratings.push("ethically questionable");
    if (tags.includes("semi-grimdark")) ratings.push("partially dark");
    if (tags.includes("grimdark")) ratings.push("dark");
    if (tags.includes("grotesque")) ratings.push("grotesque");

    text += ((ratings[0].startsWith("a") || ratings[0].startsWith("e") || ratings[0].startsWith("i") || ratings[0].startsWith("o") || ratings[0].startsWith("u") || ratings[0].startsWith("y") || ratings[0].startsWith("ha") || ratings[0].startsWith("he") || ratings[0].startsWith("hi") || ratings[0].startsWith("ho") || ratings[0].startsWith("hu") || ratings[0].startsWith("hy")) ? "An " : "A ") + join(ratings) + " ";

    // 2. Official source
    let official = [];
    if (tags.includes("official")) official.push("official");
    if (tags.includes("equestria girls") || tags.includes("equestria girls series")) official.push("Equestria Girls");
    if (tags.includes("g5")) official.push("G5");
    if (tags.includes("g4")) official.push("G4");
    if (tags.includes("g3")) official.push("G3");
    if (tags.includes("g1")) official.push("G1");
    if (tags.includes("g2")) official.push("G2");
    if (tags.includes("g4.5")) official.push("G4.5");
    if (tags.includes("idw")) official.push("IDW comic");

    text += official.length > 0 ? official.join(" ") + " " : "";

    // 3. Origins
    let origins = [];
    if ((tags.includes("edit") && tags.includes("screencap")) || tags.includes("edited screencap")) origins.push("edited screenshot");
    if ((tags.includes("edit") && tags.includes("composite screencap")) || tags.includes("edited screencap")) origins.push("edited composite screenshot");
    if (tags.includes("screencap") && !tags.includes("edit") && !tags.includes("edited screencap")) origins.push("screenshot");
    if (tags.includes("composite screencap") && !tags.includes("edit") && !tags.includes("edited screencap")) origins.push("composite screenshot");
    if (tags.includes("alternate version")) origins.push("alternative version");
    if (tags.includes("derpibooru exclusive")) origins.push("Derpibooru exclusive");
    if (tags.includes("alternate angle")) origins.push("alternative angle");
    if (tags.includes("alternate character")) origins.push("alternative character");
    if (tags.includes("ai content") || tags.includes("ai generated")) origins.push("AI-generated image");
    if (tags.includes("ai assisted") || tags.includes("fifteen.ai")) origins.push("AI-generated image");
    if (tags.includes("color edit")) origins.push("color edit");
    if (tags.includes("vector edit")) origins.push("vector edit");
    if (tags.includes("sound edit")) origins.push("sound edit");
    if ((tags.includes("edit") || tags.includes("edited edit")) && !tags.includes("screencap") && !tags.includes("composite screencap")) origins.push("vector edit");
    if (tags.includes("official comic")) origins.push("comic");
    if (tags.includes("")) origins.push("screenshot from a Seven Seas game");

    text += (origins.length > 0 ? origins.join(" ") : "image") + " ";

    // 4. Species
    let species = [];
    if (tags.includes("anthro")) species.push("anthro creatures");
    if (tags.includes("unguligrade anthro")) species.push("anthro creatures with pony hooves");
    if (tags.includes("plantigrade anthro")) species.push("anthro creatures with human feet");
    if (tags.includes("semi-anthro")) species.push("partially anthro creatures");
    if (tags.includes("digitigrade anthro")) species.push("anthro creatures walking on their toes");
    if (tags.includes("pony head on human body")) species.push("human body creatures with a pony head");
    if (tags.includes("human head pony")) species.push("pony body creatures with a human head");
    if (tags.includes("unicorn") || tags.includes("classical unicorn")) species.push("unicorns");
    if (tags.includes("pegasus")) species.push("pegasi");
    if (tags.includes("earth pony")) species.push("earth ponies");
    if (tags.includes("alicorns")) species.push("alicorns");
    if (tags.includes("human")) species.push("humans");
    if (tags.includes("dragon")) species.push("dragons");
    if (tags.includes("bat pony")) species.push("bat ponies");
    if (tags.includes("changeling") || tags.includes("changedling") || tags.includes("changeling queen")) species.push("changelings");
    if (tags.includes("griffon")) species.push("griffons");
    if (tags.includes("zebra")) species.push("zebras");
    if (tags.includes("draconequus")) species.push("draconequus");
    if (tags.includes("kirin")) species.push("kirins");
    if (tags.includes("hippogriff") || tags.includes("classical hippogriff")) species.push("hippogriffs");
    if (tags.includes("dog")) species.push("dogs");
    if (tags.includes("bird")) species.push("birds");
    if (tags.includes("robot") || tags.includes("robot pony")) species.push("robots");
    if (tags.includes("butterfly")) species.push("butterflies");
    if (tags.includes("deer")) species.push("deers");
    if (tags.includes("dracony")) species.push("draconies");
    if (tags.includes("cat")) species.push("cats");
    if (tags.includes("rabbit")) species.push("rabbits");
    if (tags.includes("seapony (g4)")) species.push("seapony");
    if (tags.includes("yak")) species.push("yaks");
    if (tags.includes("crystal pony")) species.push("crystal ponies");
    if (tags.includes("vampire")) species.push("vampires");
    if (tags.includes("goo") || tags.includes("goo pony")) species.push("goo ponies");
    if (tags.includes("pony") && species.length === 0) species.push("ponies");

    text += "with " + (species.length > 0 ? join(species) : "creatures");

    // 5. Characters
    let chars = [];

    for (let character of characters) {
        if (tags.includes(character)) {
            chars.push(formatName(character));
        }
    }

    for (let tag of tags) {
        if (tag.startsWith("oc:")) {
            tag = tag.substring(3);
            chars.push(formatName(tag) + " (OC)");
        }
    }

    if (chars.length > 0) {
        text += ", namely " + join(chars) + " ";
    } else {
        text += " ";
    }

    text = text.trim() + ". ";

    // 6. Descriptions
    let sentences = [];

    // 6a. It shows...
    let shows = [];

    if (tags.includes("rebirth misty")) shows.push("Misty Brightdawn with her new mane style");
    if (tags.includes("mane stripe sunny")) shows.push("Sunny Starscout with her mane stripe");
    if (tags.includes("height difference")) shows.push("a height difference");
    if (tags.includes("chest fluff")) shows.push("chest fluff");
    if (tags.includes("mare")) shows.push("mares");
    if (tags.includes("female")) shows.push("female creatures");
    if (tags.includes("male")) shows.push("male creatures");
    if (tags.includes("freckles") || tags.includes("butt freckles") || tags.includes("chest freckles")) shows.push("creatures with freckles");
    if (tags.includes("blanket")) shows.push("a blanket");
    if (tags.includes("bag")) shows.push("a bag");
    if (tags.includes("mane six (g5)")) shows.push("the G5 Mane Six");
    if (tags.includes("mane five")) shows.push("the G5 Mane Five");
    if (tags.includes("mane six")) shows.push("the G4 Mane Six");
    if (tags.includes("coat markings") || tags.includes("facial markings")) shows.push("body markings");
    if (tags.includes("group") || tags.includes("group photo")) shows.push("a group");
    if (tags.includes("stallion")) shows.push("stallions");
    if (tags.includes("mane stripe sunny")) shows.push("Sunny's mane stripe");
    if (tags.includes("anal insertion")) shows.push("anal insertion");
    if (tags.includes("anal")) shows.push("anal sex");
    if (tags.includes("buttplug")) shows.push("an anal plug");
    if (tags.includes("alcohol")) shows.push("alcohol");
    if (tags.includes("analingus")) shows.push("analingus");
    if (tags.includes("balloon fetish") || tags.includes("bee fetish") || tags.includes("diaper fetish") || tags.includes("fart fetish")) shows.push("a questionable fetish");
    if (tags.includes("bestiality")) shows.push("bestiality/zoophilia");
    if (tags.includes("big balls")) shows.push("big balls");
    if (tags.includes("big belly")) shows.push("big belly");
    if (tags.includes("big breasts") || tags.includes("big crotchboobs")) shows.push("big breasts");
    if (tags.includes("birth") || tags.includes("pregnant")) shows.push("ponies giving birth or being pregnant");
    if (tags.includes("canon x oc")) shows.push("canon characters and original characters together");
    if (tags.includes("chinese") || tags.includes("malaysia") || tags.includes("japanese ponycon") || tags.includes("cyrillic") || tags.includes("korean") || tags.includes("japanese") || tags.includes("spanish") || tags.includes("russian")) shows.push("text in a foreign language");
    if (tags.includes("cigarette")) shows.push("cigarettes");
    if (tags.includes("ramadan") || tags.includes("cross")) shows.push("religion");
    if (tags.includes("crossover")) shows.push("a cross-over");
    if (tags.includes("destruction")) shows.push("destruction");
    if (tags.includes("deviantart stamp") || tags.includes("watermark") || tags.includes("netflix logo")) shows.push("a watermark");
    if (tags.includes("diaper")) shows.push("diapers");
    if (tags.includes("dickgirl") || tags.includes("intersex") || tags.includes("futa") || tags.includes("transgender")) shows.push("intersex, futa or transgender creatures");
    if (tags.includes("digestion") || tags.includes("vore") || tags.includes("post-vore") || tags.includes("oral invitation") || tags.includes("non-fatal vore") || tags.includes("imminent vore")) shows.push("digestion or vore");
    if (tags.includes("flattening")) shows.push("flattening");
    if (tags.includes("femboy")) shows.push("femboys");
    if (tags.includes("fat") || tags.includes("huge belly") || tags.includes("impossibly large belly") || tags.includes("impossibly large ponut") || tags.includes("large insertion")) shows.push("fat or large creatures");
    if (tags.includes("fluffy pony grimdark")) shows.push("fluffy pony grimdark");
    if (tags.includes("glitch")) shows.push("a glitch");
    if (tags.includes("gmod")) shows.push("Garry's Mod");
    if (tags.includes("goth")) shows.push("goth style");
    if (tags.includes("hand")) shows.push("a human hand");
    if (tags.includes("racial slur")) shows.push("racial slurs");
    if (tags.includes("politics") || tags.includes("propaganda")) shows.push("politics or propaganda");
    if (tags.includes("oviposition")) shows.push("oviposition");
    if (tags.includes("human ass on pony") || tags.includes("human vagina on pony")) shows.push("human genitals on ponies");
    if (tags.includes("human on pony action")) shows.push("a human acting on a pony");
    if (tags.includes("jojo's bizarre adventure")) shows.push("Jojo's Bizarre Adventure");
    if (tags.includes("live2d")) shows.push("Live2D content");
    if (tags.includes("shark costume") || tags.includes("shark") || tags.includes("shark plushie")) shows.push("sharks");
    if (tags.includes("pissing") || tags.includes("potty time") || tags.includes("potty emergency")) shows.push("pee");
    if (tags.includes("masturbating in stomach")) shows.push("internal masturbation");
    if (tags.includes("merch sexploitation")) shows.push("sexual exploitation of merch");
    if (tags.includes("species swap")) shows.push("exchanged creature species");
    if (tags.includes("subtitles") || tags.includes("youtube caption")) shows.push("burned-in subtitles or captions");
    if (tags.includes("tongue out") || tags.includes(":p")) shows.push("creatures sticking their tongue out (blep)");
    if (tags.includes("laying down") && !tags.includes("prone")) shows.push("creatures laying down");
    if (!tags.includes("laying down") && tags.includes("prone")) shows.push("creatures laying on their stomach");
    if (tags.includes("straight")) shows.push("an heterosexual relationship");
    if (tags.includes("gay") && !tags.includes("lesbian")) shows.push("a gay relationship");
    if (tags.includes("lesbian")) shows.push("a lesbian relationship");
    if (tags.includes("latex") && !tags.includes("latex suit")) shows.push("latex");
    if (tags.includes("collar")) shows.push("a collar");
    if (tags.includes("socks")) shows.push("socks");
    if (tags.includes("clothes") && !tags.includes("latex suit")) shows.push("clothes");
    if (tags.includes("latex suit")) shows.push("a latex suit");
    if (tags.includes("wings") && !tags.includes("spread wings")) shows.push("wings");
    if (tags.includes("spread wings")) shows.push("spread wings");
    if (tags.includes("fake horn")) shows.push("a fake horn");
    if (tags.includes("horn") && !tags.includes("fake horn")) shows.push("a horn");
    if (tags.includes("duo")) shows.push("a duo of ponies");
    if (tags.includes("heart") && !tags.includes("heart eyes")) shows.push("a heart");
    if (tags.includes("wingding eyes") && !tags.includes("heart eyes")) shows.push("shape eyes");
    if (tags.includes("heart eyes")) shows.push("heart-shaped eyes");
    if (tags.includes("solo")) shows.push("a single creature");
    if (tags.includes("open mouth") || tags.includes("open smile")) shows.push("a creature with an open mouth");
    if (tags.includes("raised leg") || tags.includes("raised hoof")) shows.push("a creature with an raised leg or hoof");
    if (tags.includes("unshorn fetlocks") || tags.includes("cloven hooves")) shows.push("a creature with fluffy hooves");
    if (tags.includes("ear fluff")) shows.push("a creature with ear fluff");
    if (tags.includes("chest fluff")) shows.push("a creature with chest fluff");
    if (tags.includes("full body")) shows.push("a full body");
    if (tags.includes("annoyed")) shows.push("an annoyed creature");
    if (tags.includes("tentacles")) shows.push("tentacles");
    if (tags.includes("newspaper")) shows.push("a newspaper");
    if (tags.includes("talking")) shows.push("a creature talking");
    if (tags.includes("bracelet") && !tags.includes("friendship bracelet") && !tags.includes("jewelry")) shows.push("a bracelet");
    if (tags.includes("friendship bracelet") && !tags.includes("jewelry")) shows.push("a friendship bracelet");
    if (tags.includes("jewelry")) shows.push("jewelry");
    if (tags.includes("hoof heart")) shows.push("hooves with hearts on their back");
    if (tags.includes("vagina")) shows.push("a vagina");
    if (tags.includes("vulva")) shows.push("a vulva");
    if (tags.includes("clitoris")) shows.push("a clitoris");
    if (tags.includes("anus") && !tags.includes("ponut")) shows.push("an anus");
    if (tags.includes("ponut")) shows.push("a pony anus");
    if (tags.includes("vulvar winking")) shows.push("a vaginal winking");
    if (tags.includes("vaginal secretions")) shows.push("vaginal secretions");
    if (tags.includes("plot") || tags.includes("butt")) shows.push("a butt");

    // 6b. on...
    if (shows.length > 0) {
        let ons = [];

        if ((tags.includes("simple background") || tags.includes("gray background")) && !tags.includes("transparent background")) ons.push("a simple background");
        if (tags.includes("transparent background")) ons.push("a transparent background");

        if (ons.length > 0) shows[shows.length - 1] += " on " + join(ons);
        sentences.push("it shows " + join(shows.sort((a, b) => {
            return a.localeCompare(b);
        })));
    }

    // 6c. It is...
    let is = [];

    if (tags.includes("leak")) is.push("leaked content");
    if (tags.includes("cute") && !tags.includes("weapons-grade cute")) is.push("cute");
    if (tags.includes("weapons-grade cute")) is.push("adorable");
    if (tags.includes("nazi")) is.push("Nazi");
    if (tags.includes("no nut november")) is.push("No Nut November");
    if (tags.includes("gore")) is.push("gore");
    if (tags.includes("vulgar")) is.push("vulgar");
    if (tags.includes("tumblr")) is.push("from Tumblr");
    if (tags.includes("vtuber")) is.push("a Vtuber");
    if (tags.includes("ych result")) is.push("the result of a your-character-here");
    if (tags.includes("your character here")) is.push("a your-character-here");
    if (tags.includes("them's fightin' herds")) is.push("from Them's Fightin' Herds");
    if (tags.includes("unikitty!")) is.push("from Unikitty!");
    if (tags.includes("bluey")) is.push("from Bluey");
    if (tags.includes("seizure warning")) is.push("potentially seizure inducing");
    if (tags.includes("photo")) is.push("a photography");
    if (tags.includes("pixel art")) is.push("pixel art");
    if (tags.includes("pony town")) is.push("made in Pony Town");
    if (tags.includes("pony creator")) is.push("made in Pony Creator");
    if (tags.includes("ponified")) is.push("ponified from non-pony content");
    if (tags.includes("cute porn")) is.push("cute porn");
    if (tags.includes("text only")) is.push("composed of only text");
    if (tags.includes("meme") || tags.includes("forced meme")) is.push("a meme");
    if (tags.includes("shipping")) is.push("shipping characters");
    if (tags.includes("looking at you")) is.push("facing towards you");
    if (tags.includes("smiling") && !tags.includes("smiling at you")) is.push("smiling");
    if (tags.includes("smiling at you")) is.push("smiling at you");
    if (tags.includes("standing")) is.push("standing");
    if (tags.includes("blushing")) is.push("blushing");
    if (tags.includes("profile")) is.push("in profile");

    if (is.length > 0) sentences.push("it is " + join(is.sort((a, b) => {
        return a.localeCompare(b);
    })));

    // 6d. It implies...
    let implies = [];

    if (tags.includes("implied anon")) implies.push("anon");
    if (tags.includes("implied futa")) implies.push("futa or intersex");
    if (tags.includes("implied human")) implies.push("humans");
    if (tags.includes("implied shipping")) implies.push("shipping");
    if (tags.includes("implied lesbian")) implies.push("a lesbian relationship");
    if (tags.includes("implied gay") && !tags.includes("implied lesbian")) implies.push("a gay relationship");
    if (tags.includes("implied straight")) implies.push("an heterosexual relationship");

    if (implies.length > 0) sentences.push("it implies " + join(implies.sort((a, b) => {
        return a.localeCompare(b);
    })));

    if (sentences.length > 0) {
        let first = sentences.shift();
        first = first.substring(0, 1).toUpperCase() + first.substring(1);

        text += joinSentences([first, ...sentences]);
    }

    return text.trim() + ".";
}