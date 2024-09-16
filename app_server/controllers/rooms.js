const roomsEndpoint = 'http://localhost:3000/api/rooms_api';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET Rooms view */
const room = async function(req, res, next) {
    await fetch(roomsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No rooms exist in our database!';
                }
            }
            res.render('rooms', {
                title: "Travlr Getaways",
                rooms: json,
                message,
                active_nav: {rooms: true}
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    room
}