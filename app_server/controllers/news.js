// API endpoint to retrieve data for dynamic display.
const newsEndpoint = 'http://localhost:3000/api/news_api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET the News view */
const news = async function(req, res, next) {
    // GET request to retrieve data.
    await fetch(newsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            // Error handling for API retrieval erros and lack of data.
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No news exist in our database!';
                }
            }
            // Render the page with the retrieved data.
            res.render('news', {
                title: "Travlr Getaways",
                news: json,
                message,
                // Boolean value passed to view used for conditional formatting
                // in the Header and Footer partials
                active_nav: {news: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    news
}