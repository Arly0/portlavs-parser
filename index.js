// modules
var needle = require('needle');
var cheerio = require('cheerio');
var Logger = require('./Logger');
// const
var tmp = 'https://www.portalvs.sk/sk/vysoka-skola/zilinska-univerzita-v-ziline';
needle.get(tmp, function (err, res) {
    if (err) {
        throw err;
        Logger(err);
    }
    var $ = cheerio.load(res.body);
    var facults = $('title').text();
    console.log(facults);
});
