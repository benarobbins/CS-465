// API endpoint to retrieve data for dynamic display.
const roomsEndpoint = 'http://localhost:3000/api/rooms_api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET the Rooms view */
const room = async function(req, res, next) {
    // GET request to retrieve data.
    await fetch(roomsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            // Error handling for API retrieval errors and lack of data.
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No rooms exist in our database!';
                }
            }
            // Render the page with the retrieved data.
            res.render('rooms', {
                title: "Travlr Getaways",
                rooms: json,
                message,
                // Boolean value passed to view used for conditional formatting
                // in the Header and Footer partials
                active_nav: {rooms: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    room
}