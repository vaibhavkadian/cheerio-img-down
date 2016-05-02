var $ = require('cheerio')
var request = require('request')
var fs = require('fs')
var path = require('path')

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  fs.writeFile('./outer.html.txt', parsedHTML.html(), function (err) {});

  // get all img tags and loop over them
  var imageURLs = []
  parsedHTML('img').map(function(i, link) {
    var href = $(link).attr('src')
    if (!href.match('.jpg')) return
    imageURLs.push(href)

    //console.log(path.dirname(href).replace('/','.'))
    //fs.mkdirSync(path.dirname(href).replace('/'/g,'.'))
    //request(href).pipe(fs.createWriteStream(path.dirname(href) & path.basename(href)))
    request(href).pipe(fs.createWriteStream(__dirname + '/wifeleftdognguyrespond/' + path.basename(href)))
  })

  fs.writeFile('./outer.html.a.txt', imageURLs.toString(), function (err) {});
  fs.writeFile('./outer.html.indenteda.txt', imageURLs.join("\r\n"), function (err) {});
}

var domain = 'http://www.amazingthingss.com/wife-leaves-and-takes-all-but-the-dog-guy-responds-with-incredible-photo-series/'



//var domain = 'http://4daysin.com/pictures-around-world'
//var domain = 'http://images.royalspares.com/part_manual/RE-All_Model/'
//var domain = 'http://images.royalspares.com/part_manual/RE-Thunderbird/'
//var domain = 'http://images.royalspares.com/part_manual/RE-350cc_old/'
//var domain ='http://images.royalspares.com/part_manual/RE-Workshop_manual-I/'
//var domain = 'http://news.distractify.com/pinar/wildlife-photos-of-the-year/?v=1'
//var domain = 'http://substack.net/images/'
request(domain, gotHTML)