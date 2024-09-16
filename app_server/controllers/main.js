/* GET Homepage */
const index = (req, res) => {
    res.render('index', {
        title: "Travlr Getaways",
        active_nav: {index: true}
    });
};

module.exports = {
    index
}