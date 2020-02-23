const axios = require('axios'),
    cheerio = require('cheerio'),
    url = 'https://www.premierleague.com/stats/top/players/goals?se=274';

axios(url)
    .then(response => {
        const html = response.data,
            $ = cheerio.load(html),
            statsTable = $('.statsTableContainer > tr'),
            allTimeTopScorers = [];

        statsTable.each(function () {
            const rank = $(this).find('.rank > strong').text(),
                playerName = $(this).find('.playerName > strong').text(),
                nationality = $(this).find('.playerCountry').text(),
                goals = $(this).find('.mainStat').text();

            allTimeTopScorers.push({
                rank: rank,
                playerName: playerName,
                nationality: nationality,
                goals: goals
            });
        })
        console.log(allTimeTopScorers);
    }).catch(error => {
        console.log(error);
    });
