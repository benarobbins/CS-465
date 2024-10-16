// API endpoint to retrieve data for dynamic display.
const mealsEndpoint = 'http://localhost:3000/api/food';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET the Meals view */
const meal = async function(req, res, next) {
    // GET request to retrieve data.
    await fetch(mealsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            // Error handling for API retrieval errors and lack of data.
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No meals exist in our database!';
                }
            }
            // Render the page with the retrieved data.
            res.render('meals', {
                title: "Travlr Getaways",
                meals: json,
                message,
                // Boolean value passed to view used for conditional formatting
                // in the Header and Footer partials
                active_nav: {meals: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    meal
}