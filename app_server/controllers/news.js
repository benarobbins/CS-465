const newsEndpoint = 'http://localhost:3000/api/news_api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET News view */
const news = async function(req, res, next) {
    await fetch(newsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No news exist in our database!';
                }
            }
            res.render('news', {
                title: "Travlr Getaways",
                news: json,
                message,
                active_nav: {news: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    news
}