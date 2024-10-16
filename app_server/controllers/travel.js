// API endpoint to retrieve data for dynamic display.
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET Travel view */
const travel = async function(req, res, next) {
    // GET request to retrieve data.
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            // Error handling for API retrieval errors and lack of data.
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            // Render the page with the retrieved data.
            res.render('travel', {
                title: "Travlr Getaways",
                trips: json,
                message,
                // Boolean value passed to view used for conditional formatting
                // in the Header and Footer partials
                active_nav: {travel: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
}