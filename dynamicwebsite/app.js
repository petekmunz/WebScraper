const puppeteer = require('puppeteer'),
    url = 'https://www.reddit.com/r/news/';

function scrapForNews() {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            let urls = await page.evaluate(() => {
                let newsHeadlines = [];
                let items = document.querySelectorAll('h3._eYtD2XCVieq6emjKBH3m');
                items.forEach((item) => {
                    newsHeadlines.push({
                        title: item.textContent
                    });
                });
                return newsHeadlines;
            });
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

scrapForNews().then(console.log).catch(console.error);