const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.reddit.com/r/news/';

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => { 
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(html => {
        const $ = cheerio.load(html);
        const newsHeadLines = [];
        $('[data-click-id="body"] h3').each(function () {
            newsHeadLines.push({
                title: $(this)[0].children[0].data
            });
        });

        console.log(newsHeadLines);
    })
    .catch(console.error);