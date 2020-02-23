const puppeteer = require('puppeteer'),
    cheerio = require('cheerio'),
    url = 'https://www.reddit.com/r/news/';

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(html => {
        const $ = cheerio.load(html),
            newsHeadlines = [];
        $('h3._eYtD2XCVieq6emjKBH3m').each(function () {
            newsHeadlines.push({
                title: $(this).text(),
            });
        });
        console.log(newsHeadlines);
    }).catch(error => {
        console.log(error);
    });