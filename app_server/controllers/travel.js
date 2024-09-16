const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET Travel view */
const travel = async function(req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('travel', {
                title: "Travlr Getaways",
                trips: json,
                message,
                active_nav: {travel: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
}