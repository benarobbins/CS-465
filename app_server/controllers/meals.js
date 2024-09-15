const mealsEndpoint = 'http://localhost:3000/api/food';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET Meals view */
const meal = async function(req, res, next) {
    await fetch(mealsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No meals exist in our database!';
                }
            }
            res.render('meals', {title: 'Travlr Getaways', meals: json, message});
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    meal
}