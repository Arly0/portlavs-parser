// modules
const needle  = require('needle');
const cheerio = require('cheerio');
const Logger  = require('./Logger');

// const
const tmp = 'https://www.portalvs.sk/sk/vysoka-skola/zilinska-univerzita-v-ziline';

needle.get(tmp, function (err:any, res:any) {
  if (err) {
    throw err;
    Logger(err);
  }

  let $ = cheerio.load(res.body);
  const facults = $('title').text();

  console.log(facults);
});
